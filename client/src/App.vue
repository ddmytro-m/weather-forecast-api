<script setup lang="ts">
import "@/assets/main.css"

import { ref } from "vue"

import type { Weather } from "./types/interfaces/Weather"

import WeatherComponent from "./components/weather/WeatherComponent.vue"
import SubscriptionForm from "./components/forms/SubscriptionForm.vue"
import SearchBar from "./components/forms/SearchBar.vue"

const weather = ref<Weather>({
  temperature: 0,
  humidity: 0,
  description: "",
})

function handleWeather(newWeather: Weather) {
  weather.value = newWeather
}

const formOpened = ref(false)
</script>

<template>
  <main>
    <SearchBar class="search-bar" @weather="handleWeather" />
    <WeatherComponent :weather class="weather-component" />
    <div @click="formOpened = !formOpened" class="subscription-open-button">
      {{ formOpened ? "Hide subscription" : "Show subscription" }}
    </div>
    <div class="subscription-form-container">
      <Transition
        enter-from-class="enter-start"
        enter-to-class="enter-end"
        leave-from-class="leave-start"
        leave-to-class="leave-end"
      >
        <SubscriptionForm v-if="formOpened" @close="formOpened = false" />
      </Transition>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.search-bar {
  margin-bottom: 12px;
}

.subscription-form-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}

.enter-start,
.leave-end {
  opacity: 0;
  transform: translateY(100px);
  transition: 0.5s ease all;
}

.enter-end,
.leave-start {
  opacity: 1;
  transform: translateY(0);
  transition: 0.5s ease all;
}

.leave-start,
.leave-end {
  position: absolute;
}

.subscription-open-button {
  text-decoration: underline;
  cursor: pointer;
}
</style>
