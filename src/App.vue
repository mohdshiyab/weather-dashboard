<template>
  <div class="min-h-screen bg-ink font-body text-cloud">
    <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-5 py-10 sm:py-16">
      <!-- Header -->
      <header class="mb-8 flex items-center gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber/15 text-amber">
          <PartlyCloudyIcon class="h-6 w-6" />
        </div>
        <div>
          <h1 class="font-display text-2xl font-semibold tracking-tight text-cloud">Weather Dashboard</h1>
          <p class="font-body text-sm text-cloud/50">Search any city for current conditions and a 5-day outlook.</p>
        </div>
      </header>

      <!-- Search -->
      <SearchBar
        v-model="store.cityInput"
        :disabled="store.loading"
        class="mb-8"
        @search="handleSearch"
      />

      <!-- Body: loading / error / empty / results -->
      <main class="flex-1">
        <LoadingState v-if="store.loading" />

        <ErrorState
          v-else-if="store.error"
          :message="store.error"
          @retry="handleSearch(store.searchedCity || store.cityInput)"
        />

        <EmptyState
          v-else-if="store.isEmpty"
          :recent-searches="store.recentSearches"
          @select="selectRecent"
        />

        <div v-else class="space-y-6">
          <CurrentWeather
            :weather="store.currentWeather"
            :refreshing="store.loading"
            @refresh="store.refresh"
          />
          <ForecastList :days="store.forecast.days" />
        </div>
      </main>

      <footer class="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-cloud/25">
        Type "invalid" to preview the error state
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useWeatherStore } from './stores/weatherStore'
import SearchBar from './components/SearchBar.vue'
import LoadingState from './components/LoadingState.vue'
import ErrorState from './components/ErrorState.vue'
import EmptyState from './components/EmptyState.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import ForecastList from './components/ForecastList.vue'
import PartlyCloudyIcon from './assets/icons/PartlyCloudyIcon.vue'

const store = useWeatherStore()

function handleSearch(city) {
  store.search(city)
}

function selectRecent(city) {
  store.cityInput = city
  store.search(city)
}

onMounted(() => {
  const lastCity = store.restoreLastCity()
  if (lastCity) store.search(lastCity)
})
</script>
