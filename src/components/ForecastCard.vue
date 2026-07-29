<template>
  <div
    class="animate-rise flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition hover:border-white/20 hover:bg-white/[0.07]"
  >
    <div>
      <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-cloud/45">{{ formatWeekday(day.dateIso) }}</p>
      <p class="font-body text-xs text-cloud/35">{{ shortDate }}</p>
    </div>

    <div class="h-9 w-9 text-amber/80">
      <WeatherIcon :condition="day.condition" />
    </div>

    <p class="font-body text-sm text-cloud/70">{{ day.condition }}</p>

    <div class="mt-auto space-y-1.5">
      <div class="flex items-center justify-between font-mono text-sm text-cloud">
        <span class="text-cloud/50">{{ formatTemp(day.minTempC, { withUnit: false }) }}</span>
        <span class="font-semibold">{{ formatTemp(day.maxTempC) }}</span>
      </div>
      <!-- range gauge, scaled against the week's overall min/max -->
      <div class="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          class="absolute h-full rounded-full bg-gradient-to-r from-rain to-amber"
          :style="{ left: `${barLeft}%`, width: `${barWidth}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import WeatherIcon from './WeatherIcon.vue'
import { formatTemp } from '../utils/formatTemp'
import { formatWeekday, formatDayLabel } from '../utils/formatDate'

const props = defineProps({
  day: { type: Object, required: true },
  weekMin: { type: Number, required: true },
  weekMax: { type: Number, required: true },
})

const shortDate = computed(() => formatDayLabel(props.day.dateIso).split(', ')[1] || '')

const span = computed(() => Math.max(props.weekMax - props.weekMin, 1))
const barLeft = computed(() => ((props.day.minTempC - props.weekMin) / span.value) * 100)
const barWidth = computed(
  () => Math.max(((props.day.maxTempC - props.day.minTempC) / span.value) * 100, 8),
)
</script>
