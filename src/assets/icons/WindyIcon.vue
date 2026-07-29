<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <path
      d="M15 27a6 6 0 0 1-1-11.92A7.7 7.7 0 0 1 29 13.5a6.3 6.3 0 0 1 3.3 11.68A5 5 0 0 1 32 27H15Z"
      fill="currentColor" opacity="0.9" />
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round" :class="animated ? 'animate-drift' : ''">
      <path d="M9 33h16a3 3 0 1 0-2.5-4.7" />
      <path d="M9 38h11a2.4 2.4 0 1 1-2 3.6" />
    </g>
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
