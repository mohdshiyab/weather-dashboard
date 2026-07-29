<template>
  <div
    class="animate-rise flex flex-col items-center gap-4 rounded-3xl border border-red-400/20 bg-red-500/[0.08] px-8 py-12 text-center shadow-panel"
    role="alert"
  >
    <div class="flex h-14 w-14 items-center justify-center rounded-full bg-red-400/15 text-red-300">
      <AlertIcon class="h-7 w-7" />
    </div>
    <div>
      <p class="font-display text-xl font-medium text-cloud">Couldn't load weather</p>
      <p class="mt-1.5 max-w-sm font-body text-sm text-cloud/60">{{ message }}</p>
    </div>
    <button
      type="button"
      class="mt-1 rounded-xl bg-cloud/10 px-5 py-2.5 font-body text-sm font-semibold text-cloud transition hover:bg-cloud/[0.16] active:scale-[0.97]"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>

<script setup>
import AlertIcon from '../assets/icons/AlertIcon.vue'

defineProps({
  message: { type: String, default: "Please try again." },
})
defineEmits(['retry'])
</script>
