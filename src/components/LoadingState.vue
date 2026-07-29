<template>
  <div class="animate-rise" role="status" aria-live="polite" aria-label="Loading weather">
    <div class="rounded-3xl border border-white/10 bg-dusk-light/40 p-8 shadow-panel">
      <div class="flex items-center justify-between">
        <div class="space-y-3">
          <div class="h-3 w-32 animate-pulse rounded-full bg-white/10"></div>
          <div class="h-12 w-28 animate-pulse rounded-full bg-white/10"></div>
          <div class="h-3 w-40 animate-pulse rounded-full bg-white/10"></div>
        </div>
        <div class="h-20 w-20 animate-pulse rounded-full bg-white/10"></div>
      </div>
      <div class="mt-8 grid grid-cols-3 gap-3">
        <div v-for="i in 3" :key="i" class="h-14 animate-pulse rounded-2xl bg-white/[0.06]"></div>
      </div>
    </div>
    <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
      <div v-for="i in 5" :key="i" class="h-28 animate-pulse rounded-2xl bg-white/[0.06]" :style="{ animationDelay: `${i * 60}ms` }"></div>
    </div>
    <p class="mt-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-cloud/40">
      Fetching latest readings&hellip;
    </p>
  </div>
</template>
