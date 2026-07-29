<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <path
      d="M13 24a6.5 6.5 0 0 1-1-12.92A8.5 8.5 0 0 1 28.5 9.6a7 7 0 0 1 3.6 12.98A5.6 5.6 0 0 1 31 24H13Z"
      fill="currentColor" opacity="0.9" />
    <path d="M25 26l-6 10h5l-3 8 10-12h-5l3-6h-4Z" fill="currentColor" />
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
