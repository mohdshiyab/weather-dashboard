<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <path
      d="M13 27a6.5 6.5 0 0 1-1-12.92A8.5 8.5 0 0 1 28.5 12.6a7 7 0 0 1 3.6 12.98A5.6 5.6 0 0 1 31 27H13Z"
      fill="currentColor" opacity="0.9" />
    <g v-if="animated">
      <line v-for="i in 3" :key="i" :x1="16 + i * 6" y1="31" :x2="14 + i * 6" y2="38"
        stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
        class="animate-fall" :style="{ animationDelay: `${i * 0.18}s` }" />
    </g>
    <g v-else>
      <line v-for="i in 3" :key="i" :x1="16 + i * 6" y1="31" :x2="14 + i * 6" y2="38"
        stroke="currentColor" stroke-width="2.4" stroke-linecap="round" />
    </g>
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
