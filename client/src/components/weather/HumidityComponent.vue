<script setup lang="ts">
import NumberFlowElement from "@number-flow/vue"
import { computed } from "vue"

const props = defineProps<{
  humidity: number
}>()

const innerHeight = 22
const shift = computed(() => innerHeight * ((100 - props.humidity) / 100))
</script>

<template>
  <div class="humidity-container">
    <div class="circle">
      <div class="surface-level" :style="{ transform: `translateY(${shift}px)` }"></div>
    </div>
    Humidity:
    <NumberFlowElement :value="props.humidity" />
  </div>
</template>

<style scoped>
.humidity-container {
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 4px;
}

.circle {
  position: relative;

  width: 24px;
  height: 24px;
  border: 1px solid var(--color-text);
  border-radius: 9999px;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
}

.surface-level {
  position: absolute;

  width: 22px;
  height: 22px;
  background-color: var(--color-text);

  transition: 0.5s ease transform;

  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  position: relative;
  color: var(--color-divider);
}
</style>
