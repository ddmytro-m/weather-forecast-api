<script setup lang="ts">
import { TemperatureUnit } from "@/types/TemperatureUnit"

const model = defineModel<TemperatureUnit>()
</script>

<template>
  <div class="temperature-unit-selector">
    <div class="labels-container">
      <label
        :style="{ color: model === 'celsius' ? 'var(--color-text)' : 'var(--color-text-unactive)' }"
      >
        <input
          type="radio"
          name="temperature-unit-selector"
          value="celsius"
          id="celsius"
          v-model="model"
        />
        Celsius</label
      >
      <div class="separator"></div>
      <label
        :style="{
          color: model === 'fahrenheit' ? 'var(--color-text)' : 'var(--color-text-unactive)',
        }"
        ><input
          type="radio"
          name="temperature-unit-selector"
          value="fahrenheit"
          id="fahrenheit"
          v-model="model"
        />Fahrenheit</label
      >
    </div>
  </div>
</template>

<style scoped>
input {
  display: none;
}

label {
  transition: 0.3s ease color;
  cursor: pointer;
}

.temperature-unit-selector {
  width: 100%;
}

.labels-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.separator {
  width: 1px;
  height: 16px;
  background-color: var(--color-text);
}
</style>
