<template>
  <section aria-label="5-day forecast">
    <div class="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cloud/40">
      <span class="h-px flex-1 bg-white/10"></span>
      5-Day Forecast
      <span class="h-px flex-1 bg-white/10"></span>
    </div>
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
      <ForecastCard
        v-for="(day, i) in days"
        :key="day.dateIso"
        :day="day"
        :week-min="weekMin"
        :week-max="weekMax"
        :style="{ animationDelay: `${i * 60}ms` }"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ForecastCard from './ForecastCard.vue'

const props = defineProps({
  days: { type: Array, required: true },
})

const weekMin = computed(() => Math.min(...props.days.map((d) => d.minTempC)))
const weekMax = computed(() => Math.max(...props.days.map((d) => d.maxTempC)))
</script>
