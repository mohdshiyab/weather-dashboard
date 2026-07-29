<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <path
      d="M13 26a6.5 6.5 0 0 1-1-12.92A8.5 8.5 0 0 1 28.5 11.6a7 7 0 0 1 3.6 12.98A5.6 5.6 0 0 1 31 26H13Z"
      fill="currentColor" opacity="0.9" />
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path v-for="i in 3" :key="i" :d="`M${17 + i * 6} 30 v9 M${14 + i * 6} 32.5 l6 4 M${20 + i * 6} 32.5 l-6 4`" />
    </g>
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
