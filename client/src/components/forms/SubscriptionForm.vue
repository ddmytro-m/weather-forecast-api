<script setup lang="ts">
import { api } from "@/api/api"
import { Subscription } from "@/types/interfaces/Subscription"
import { AxiosError } from "axios"
import { Field, Form, ErrorMessage } from "vee-validate"
import { computed, ref } from "vue"
import { useToast } from "vue-toast-notification"
import * as yup from "yup"

const $toast = useToast()

const emit = defineEmits<{
  close: [void]
}>()

const subscritionSchema = yup.object<Subscription>({
  email: yup.string().email().required(),
  city: yup.string().min(1).required(),
  frequency: yup.string().oneOf(["hourly", "daily"]).required(),
})

const tokenSchema = yup.object({
  token: yup.string().uuid().required(),
})

const page = ref<"subscribe" | "token" | "unsubscribe">("token")
const schema = computed(() => {
  if (page.value === "subscribe") return subscritionSchema
  return tokenSchema
})

// eslint-disable-next-line
async function onSubmit(data: any) {
  try {
    if (page.value === "subscribe") {
      await api.post("/subscribe", data)
      page.value = "token"
      $toast.info("Confiramtion token was sent to your email", { duration: 5000 })
    } else if (page.value === "token") {
      const token: string = data.token
      await api.get(`/confirm/${token}`)
      $toast.success("Succesfully confirmed")
      emit("close")
    } else {
      const token: string = data.token
      await api.get(`/unsubscribe/${token}`)
      $toast.success("Succesfully deleted")
      emit("close")
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response.data.error ?? "Unknown error"
      $toast.error(errorMessage)
    }
  }
}

const frequency = ref<"hourly" | "daily">("hourly")
</script>

<template>
  <div class="subscription-form-container">
    <div class="page-selector">
      <label
        :style="{
          color: page === 'subscribe' ? 'var(--color-text)' : 'var(--color-text-unactive)',
          textDecoration: page === 'subscribe' ? 'none' : 'underline',
        }"
      >
        <Field name="page" type="radio" value="subscribe" v-model="page" />
        Subscribe
      </label>
      <div class="separator"></div>
      <label
        :style="{
          color: page === 'token' ? 'var(--color-text)' : 'var(--color-text-unactive)',
          textDecoration: page === 'token' ? 'none' : 'underline',
        }"
      >
        <Field name="page" type="radio" value="token" v-model="page" />
        Token confirmation
      </label>
      <div class="separator"></div>
      <label
        :style="{
          color: page === 'unsubscribe' ? 'var(--color-text)' : 'var(--color-text-unactive)',
          textDecoration: page === 'unsubscribe' ? 'none' : 'underline',
        }"
      >
        <Field name="page" type="radio" value="unsubscribe" v-model="page" />
        Unsubscribe
      </label>
    </div>

    <Form @submit="onSubmit" :validation-schema="schema" class="subscription-form">
      <div v-if="page === 'subscribe'" class="form-window">
        <div class="city-container">
          <Field name="city" placeholder="city" />
          <ErrorMessage name="city" class="error-message" />
        </div>

        <div class="email-container">
          <Field name="email" placeholder="email" type="email" />
          <ErrorMessage name="email" class="error-message" />
        </div>

        <div class="frequency-container">
          updates:
          <div class="labels-container">
            <label
              :style="{
                color: frequency === 'hourly' ? 'var(--color-text)' : 'var(--color-text-unactive)',
              }"
            >
              <Field name="frequency" type="radio" value="hourly" v-model="frequency" />
              Hourly
            </label>
            <div class="separator"></div>
            <label
              :style="{
                color: frequency === 'daily' ? 'var(--color-text)' : 'var(--color-text-unactive)',
              }"
            >
              <Field name="frequency" type="radio" value="daily" v-model="frequency" />
              Daily
            </label>
          </div>
        </div>
      </div>
      <div v-else-if="page === 'token' || page === 'unsubscribe'" class="form-window">
        <div class="token-container">
          <Field name="token" placeholder="token" type="uuid" />
          <ErrorMessage name="token" class="error-message" />
        </div>
      </div>

      <button type="submit" class="submit-button">Submit</button>
    </Form>
  </div>
</template>

<style scoped>
.subscription-form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  width: calc(100%-32px);
  max-width: 320px;
  padding-top: 12px;
  margin: 0 16px;

  border-top: 1px solid var(--color-border);
}

.subscription-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.form-window {
  max-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.city-container,
.email-container,
.frequency-container,
.token-container {
  width: 240px;
}

input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  outline: none;
  color: var(--color-text);
  width: 100%;

  font-size: 14px;
  padding: 6px;
}

input:focus {
  border-color: var(--color-text);
}

input::placeholder {
  color: var(--color-text-unactive);
}

input[type="radio"] {
  display: none;
}

.error-message {
  color: var(--color-text-unactive);
  font-size: 12px;
}

.frequency-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  color: var(--color-text);
}

.labels-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  font-size: 16px;
}

.page-selector {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 4px;
  text-wrap: nowrap;
  font-size: 14px;
}

.page-selector > .separator {
  height: 14px;
}

label {
  cursor: pointer;
  transition: 0.3s ease color;
}

.separator {
  width: 1px;
  height: 16px;
  background-color: var(--color-text);
}

.submit-button {
  background-color: transparent;
  padding: 4px 16px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 16px;
}

.token-description {
  text-align: center;
  font-size: 14px;
}
</style>
