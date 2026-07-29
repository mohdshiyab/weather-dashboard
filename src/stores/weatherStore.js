import { defineStore } from 'pinia'
import { getCurrentWeather, getForecast, WeatherApiError } from '../services/weatherAPI'

const LAST_CITY_KEY = 'weather-dashboard:last-city'
const RECENT_SEARCHES_KEY = 'weather-dashboard:recent-searches'
const MAX_RECENT = 5

function readRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    /** The text currently sitting in the search input. */
    cityInput: '',
    /** The city the last successful/attempted lookup was for. */
    searchedCity: '',
    /** Current weather payload, or null before the first successful fetch. */
    currentWeather: null,
    /** Forecast payload, or null before the first successful fetch. */
    forecast: null,
    /** True while a fetch (initial search or refresh) is in flight. */
    loading: false,
    /** Human-readable error message, or null when there is no error. */
    error: null,
    /** Up to 5 most recently searched city names, newest first. */
    recentSearches: readRecentSearches(),
  }),

  getters: {
    hasResult: (state) => Boolean(state.currentWeather && state.forecast),
    isEmpty: (state) => !state.loading && !state.error && !state.currentWeather,
  },

  actions: {
    /** Restores the last searched city (if any) from localStorage, without fetching. */
    restoreLastCity() {
      const saved = localStorage.getItem(LAST_CITY_KEY)
      if (saved) this.cityInput = saved
      return saved
    },

    _rememberCity(city) {
      localStorage.setItem(LAST_CITY_KEY, city)
      const deduped = [city, ...this.recentSearches.filter((c) => c.toLowerCase() !== city.toLowerCase())]
      this.recentSearches = deduped.slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(this.recentSearches))
    },

    /**
     * Runs a fresh search for the given city (or the current input if omitted).
     * Populates both current weather and forecast in parallel.
     */
    async search(city = this.cityInput) {
      const trimmed = city.trim()
      if (!trimmed) {
        this.error = 'Enter a city name to search.'
        return
      }
      this.loading = true
      this.error = null
      this.searchedCity = trimmed
      try {
        // One nonce shared by both calls so a single search/refresh produces
        // a coherent reading (current + forecast agree), while a later
        // refresh of the same city gets a fresh nonce and a new reading.
        const nonce = Date.now()
        const [current, forecast] = await Promise.all([
          getCurrentWeather(trimmed, nonce),
          getForecast(trimmed, nonce),
        ])
        this.currentWeather = current
        this.forecast = forecast
        this._rememberCity(trimmed)
      } catch (err) {
        this.currentWeather = null
        this.forecast = null
        this.error = err instanceof WeatherApiError ? err.message : 'Unexpected error. Please try again.'
      } finally {
        this.loading = false
      }
    },

    /** Re-fetches data for the last searched city without resetting the UI to empty. */
    async refresh() {
      if (!this.searchedCity) return
      await this.search(this.searchedCity)
    },

    clearError() {
      this.error = null
    },
  },
})
