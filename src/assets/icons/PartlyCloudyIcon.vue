<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <g :class="animated ? 'origin-center animate-spin' : ''" style="animation-duration: 14s" opacity="0.95">
      <circle cx="30" cy="15" r="6.5" fill="currentColor" />
      <line v-for="angle in 8" :key="angle" x1="30" y1="2" x2="30" y2="6"
        stroke="currentColor" stroke-width="2" stroke-linecap="round"
        :transform="`rotate(${(angle - 1) * 45} 30 15)`" />
    </g>
    <path
      d="M13 34a6.5 6.5 0 0 1-1-12.92A8.5 8.5 0 0 1 26 18.6a7 7 0 0 1 5 12.98A5.6 5.6 0 0 1 30 34H13Z"
      fill="currentColor" />
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
