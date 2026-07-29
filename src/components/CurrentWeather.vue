<template>
  <div
    class="animate-rise relative overflow-hidden rounded-3xl p-8 shadow-panel"
    :class="skyClassFor(weather.condition)"
  >
    <!-- ambient glow -->
    <div class="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-amber/20 blur-3xl"></div>

    <div class="relative flex items-start justify-between gap-4">
      <div>
        <div class="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-cloud/60">
          <LocationIcon class="h-3.5 w-3.5" />
          <span>{{ weather.city }}<span v-if="weather.country">, {{ weather.country }}</span></span>
        </div>
        <p class="mt-3 font-display text-6xl font-semibold leading-none text-cloud sm:text-7xl">
          {{ formatTemp(weather.temperatureC) }}
        </p>
        <p class="mt-2 font-body text-base text-cloud/80">{{ weather.condition }}</p>
      </div>

      <div class="h-20 w-20 shrink-0 text-amber sm:h-24 sm:w-24">
        <WeatherIcon :condition="weather.condition" animated />
      </div>
    </div>

    <div class="relative mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      <div class="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
        <div class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cloud/50">
          <HumidityIcon class="h-3.5 w-3.5" /> Humidity
        </div>
        <p class="mt-1 font-mono text-lg font-medium text-cloud">{{ weather.humidityPercent }}%</p>
      </div>
      <div class="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
        <div class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cloud/50">
          <WindIcon class="h-3.5 w-3.5" /> Wind
        </div>
        <p class="mt-1 font-mono text-lg font-medium text-cloud">{{ weather.windKmph }} km/h</p>
      </div>
      <div class="col-span-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm sm:col-span-1">
        <div class="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-cloud/50">
          <ClockIcon class="h-3.5 w-3.5" /> Updated
        </div>
        <p class="mt-1 font-mono text-lg font-medium text-cloud">{{ formatUpdatedTime(weather.updatedAtIso) }}</p>
      </div>
    </div>

    <button
      type="button"
      :disabled="refreshing"
      class="group relative mt-6 flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 font-body text-sm font-medium text-cloud/80 transition hover:border-amber/40 hover:text-cloud disabled:cursor-not-allowed disabled:opacity-60"
      @click="$emit('refresh')"
    >
      <RefreshIcon class="h-4 w-4" :class="refreshing ? 'animate-spin' : ''" />
      {{ refreshing ? 'Refreshing…' : 'Refresh' }}
    </button>
  </div>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue'
import LocationIcon from '../assets/icons/LocationIcon.vue'
import HumidityIcon from '../assets/icons/HumidityIcon.vue'
import WindIcon from '../assets/icons/WindIcon.vue'
import ClockIcon from '../assets/icons/ClockIcon.vue'
import RefreshIcon from '../assets/icons/RefreshIcon.vue'
import { formatTemp } from '../utils/formatTemp'
import { formatUpdatedTime } from '../utils/formatDate'
import { skyClassFor } from '../utils/skyTheme'

defineProps({
  weather: { type: Object, required: true },
  refreshing: { type: Boolean, default: false },
})
defineEmits(['refresh'])
</script>
