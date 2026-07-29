<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <circle cx="24" cy="24" r="9" fill="currentColor" />
    <g :class="animated ? 'origin-center animate-spin' : ''" style="animation-duration: 12s">
      <line v-for="angle in 8" :key="angle" x1="24" y1="6" x2="24" y2="11"
        stroke="currentColor" stroke-width="2.4" stroke-linecap="round"
        :transform="`rotate(${(angle - 1) * 45} 24 24)`" />
    </g>
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
