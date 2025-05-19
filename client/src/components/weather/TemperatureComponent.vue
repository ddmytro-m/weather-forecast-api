<script setup lang="ts">
import { TemperatureUnit } from "@/types/TemperatureUnit"
import NumberFlow from "@number-flow/vue"
import { computed } from "vue"

const props = defineProps<{
  temperature: number
  unit: TemperatureUnit
}>()

const value = computed(() => {
  const temparature = props.unit === "fahrenheit" ? props.temperature * 1.8 + 32 : props.temperature
  return Math.round(temparature * 10) / 10
})
</script>

<template>
  <NumberFlow :value :suffix="unit === 'fahrenheit' ? '°F' : '°C'" class="number-flow" />

</template>

<style scoped>
.number-flow {
  font-size: 64px;
}
</style>
