<template>
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :class="$attrs.class">
    <path
      :class="animated ? 'animate-drift' : ''"
      d="M14 32a7 7 0 0 1-1-13.94A9 9 0 0 1 30 15.1a7.5 7.5 0 0 1 4 13.86A6 6 0 0 1 32 32H14Z"
      fill="currentColor" />
  </svg>
</template>

<script setup>
defineProps({ animated: { type: Boolean, default: false } })
</script>
