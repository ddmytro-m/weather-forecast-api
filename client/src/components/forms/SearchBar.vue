<script setup lang="ts">
import { api } from "@/api/api"
import { Subscription } from "@/types/interfaces/Subscription"
import { Weather } from "@/types/interfaces/Weather"
import { AxiosError } from "axios"
import { Field, Form, ErrorMessage } from "vee-validate"
import { useToast } from "vue-toast-notification"
import * as yup from "yup"

const $toast = useToast()

const emit = defineEmits<{
  weather: [Weather]
}>()

const citySchema = yup.object<Subscription>({
  city: yup.string().min(1).required(),
})

async function onSubmit(data: { city: string }) {
  try {
    const { data: weather } = await api.get<Weather>("/weather", {
      params: { city: data.city },
    })
    emit("weather", weather)
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      const errorMessage = error.response.data.error ?? "Unknown error"
      $toast.error(errorMessage)
    }
  }
}
</script>

<template>
  <div class="searchbar-form-container">
    <Form @submit="onSubmit" :validation-schema="citySchema" class="searchbar-form">
      <div class="city-container">
        <Field name="city" placeholder="city" />
        <ErrorMessage name="city" class="error-message" />
      </div>
      <button type="submit" class="submit-button">
        <img src="@/assets/search.svg" />
      </button>
    </Form>
  </div>
</template>

<style scoped>
.searchbar-form-container {
  width: calc(100%-32px);
  max-width: 320px;
  padding-top: 12px;
  margin: 0 16px;
}

.searchbar-form {
  position: relative;

  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.city-container {
  width: 180px;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  outline: none;
  color: var(--color-text);
  width: 100%;

  text-align: center;

  font-size: 14px;
  padding: 6px;
}

input:focus {
  border-color: var(--color-text);
}

input::placeholder {
  color: var(--color-text-unactive);
}

.error-message {
  position: absolute;

  display: block;
  width: 100%;

  text-wrap: nowrap;
  text-align: center;
  font-size: 12px;
  color: var(--color-text-unactive);
}

.submit-button {
  position: absolute;

  width: 28px;
  height: 28px;
  border-radius: 9999px;

  right: -36px;

  background-color: transparent;
  border: 1px solid var(--color-border);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button > img {
  width: 16px;
  height: 16px;
}

.token-description {
  text-align: center;
  font-size: 14px;
}
</style>
