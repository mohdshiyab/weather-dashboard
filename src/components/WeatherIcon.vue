<template>
  <component :is="iconComponent" :animated="animated" :class="props.class" />
</template>

<script setup>
import { computed } from 'vue'
import SunIcon from '../assets/icons/SunIcon.vue'
import CloudIcon from '../assets/icons/CloudIcon.vue'
import PartlyCloudyIcon from '../assets/icons/PartlyCloudyIcon.vue'
import RainIcon from '../assets/icons/RainIcon.vue'
import SnowIcon from '../assets/icons/SnowIcon.vue'
import StormIcon from '../assets/icons/StormIcon.vue'
import WindyIcon from '../assets/icons/WindyIcon.vue'

const props = defineProps({
  condition: { type: String, default: '' },
  animated: { type: Boolean, default: false },
  class: { type: String, default: 'w-full h-full' },
})

const iconMap = [
  { test: /partly/i, icon: PartlyCloudyIcon },
  { test: /sun|clear/i, icon: SunIcon },
  { test: /storm|thunder/i, icon: StormIcon },
  { test: /snow|sleet/i, icon: SnowIcon },
  { test: /rain|drizzle|shower/i, icon: RainIcon },
  { test: /wind/i, icon: WindyIcon },
  { test: /cloud|overcast|fog|mist/i, icon: CloudIcon },
]

const iconComponent = computed(() => {
  const match = iconMap.find((entry) => entry.test.test(props.condition))
  return match ? match.icon : CloudIcon
})
</script>
