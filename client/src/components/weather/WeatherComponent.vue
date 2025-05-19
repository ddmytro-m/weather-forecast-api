<script setup lang="ts">
import { Weather } from "@/types/interfaces/Weather"
import TemperatureComponent from "./TemperatureComponent.vue"
import TemperatureUnitSelector from "./TemperatureUnitSelector.vue"
import HumidityComponent from "./HumidityComponent.vue"
import { TemperatureUnit } from "@/types/TemperatureUnit"
import { ref } from "vue"

defineProps<{
  weather: Weather
}>()

const unit = ref<TemperatureUnit>("celsius")
</script>

<template>
  <div class="weather-container">
    <TemperatureComponent :temperature="weather.temperature" :unit />
    <TemperatureUnitSelector v-model="unit" />
    <HumidityComponent :humidity="weather.humidity" />
    <div class="weather-description">{{ weather.description }}</div>
  </div>
</template>

<style scoped>
.weather-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.weather-description {
  text-align: center;
  max-width: 200px;
}
</style>
