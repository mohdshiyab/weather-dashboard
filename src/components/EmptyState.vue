<template>
  <div class="animate-rise flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-16 text-center">
    <div class="h-16 w-16 text-amber/70">
      <PartlyCloudyIcon animated class="h-full w-full" />
    </div>
    <div>
      <p class="font-display text-xl font-medium text-cloud">Search a city to see the weather</p>
      <p class="mt-1.5 max-w-sm font-body text-sm text-cloud/50">
        Current conditions and a 5-day outlook, in one look.
      </p>
    </div>
    <div v-if="recentSearches.length" class="mt-2 flex flex-wrap items-center justify-center gap-2">
      <span class="font-mono text-[11px] uppercase tracking-[0.18em] text-cloud/35">Recent</span>
      <button
        v-for="city in recentSearches"
        :key="city"
        type="button"
        class="rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 font-body text-sm text-cloud/80 transition hover:border-amber/40 hover:text-cloud"
        @click="$emit('select', city)"
      >
        {{ city }}
      </button>
    </div>
  </div>
</template>

<script setup>
import PartlyCloudyIcon from '../assets/icons/PartlyCloudyIcon.vue'

defineProps({
  recentSearches: { type: Array, default: () => [] },
})
defineEmits(['select'])
</script>
