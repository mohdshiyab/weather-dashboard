# Weather Dashboard

A clean, dashboard-style weather app built with **Vue 3 (Composition API)**, **Pinia**, **Vite**, and **Tailwind CSS**. Search a city to see current conditions and a 5-day outlook, refresh without a page reload, and see clear loading/empty/error states throughout.

## Live features

- **Current weather** — city + country, temperature, condition, humidity, wind, last-updated time
- **5-day forecast** — date, min/max temperature (with a visual range gauge scaled across the week), condition
- **Refresh without reload** — re-fetches current + forecast data in place
- **Full state coverage** — idle/empty, loading (skeleton), success, and error, all handled explicitly
- **Recent searches & last city remembered** — persisted to `localStorage`
- **Custom SVG icon system** — every icon (sun, cloud, rain, snow, storm, wind, humidity, etc.) is hand-built inline SVG, no emoji or icon-font dependency
- **Condition-aware "sky" background** — the current-weather panel's gradient shifts to match the reported condition (clear / cloudy / rain / storm)
- Accessible: visible keyboard focus rings, `aria-live`/`role="alert"` on loading and error states, `prefers-reduced-motion` respected

#photos
<img width="706" height="817" alt="image" src="https://github.com/user-attachments/assets/b07b35b6-48e4-4ff9-97fe-45ada0f91bb1" />


## Getting started

```bash
npm install
npm run dev       # start the dev server (Vite, default http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run test      # run the Vitest suite once
npm run test:watch
```

Requires Node 18+.

## Project structure

```
src/
  components/
    SearchBar.vue         search input + submit button (Enter-to-search built in)
    LoadingState.vue       skeleton loading UI
    ErrorState.vue         error card with a retry action
    EmptyState.vue         pre-search state + recent-search chips
    CurrentWeather.vue     the instrument-panel style current conditions card
    ForecastCard.vue       a single forecast day tile with a min/max range gauge
    ForecastList.vue       lays out the 5 ForecastCards
    WeatherIcon.vue        maps a condition string to the right SVG icon
  stores/
    weatherStore.js        Pinia store: city input, current weather, forecast,
                            loading/error state, recent searches, persistence
  services/
    weatherAPI.js          talks to the three JSONBin endpoints, normalizes
                            success/error payloads, throws WeatherApiError
  utils/
    formatTemp.js           formatTemp(), formatTempRange()
    formatDate.js           formatWeekday(), formatDayLabel(), formatUpdatedTime()
    skyTheme.js             maps a condition to its background gradient class
    cityDirectory.js        resolves a typed city into {city, country}
    weatherSimulator.js     seeded per-city current weather + forecast generator
  assets/icons/             one .vue file per SVG icon
tests/
  format.test.js              unit tests for the formatting helpers
  weatherSimulator.test.js    unit tests for city/country resolution + the generator
  App.test.js                  component test: empty / loading / success / error states
```

## A note on the supplied API endpoints

The three endpoints given for this assignment are static JSONBin documents — each one always returns the exact same fixture payload, no matter what city is requested (JSONBin serves a fixed bin, it can't parse a query string). Rendering that raw response directly would mean every city shows "Bengaluru, IN" with the same 29°C reading, which defeats the point of a per-city search. `services/weatherAPI.js` handles this in two layers:

1. **The required GET calls still happen.** Every search makes a real request to the current-weather and forecast success endpoints (or the error endpoint, see below) — the network contract and error-handling path match the spec exactly.
2. **The displayed numbers are generated per city**, via a small seeded random-number generator (`utils/weatherSimulator.js`) keyed by the city name — so "Tokyo" and "Paris" reliably show different temperatures, conditions, humidity, and wind, and the same city gives a fresh-but-plausible reading each time you hit Refresh. City → country is resolved with `utils/cityDirectory.js`, which recognizes ~150 common cities and also accepts an explicit `"City, Country"` input (e.g. `Springfield, Narnia`) for anything not in the table.

Error simulation: searching **an empty string, or a city name containing "error", "invalid", or "unknown"** (e.g. typing `invalid` or `test error`) calls the real **error** endpoint and surfaces its message through the error card and retry flow. A genuine network failure (offline, DNS failure, non-2xx response) is caught the same way, with a distinct message.

This is documented here and at the top of `services/weatherAPI.js` rather than hidden. Swapping in a real weather API (e.g. OpenWeatherMap) later would mean replacing the generator calls with the API's actual response fields — the store and components don't know or care where the numbers come from.

## Testing

Two categories of tests are included, run with **Vitest** (+ `@vue/test-utils` for the component test):

1. **Unit tests** (`tests/format.test.js`, `tests/weatherSimulator.test.js`) — temperature/date formatting helpers with edge cases; city/country resolution (known city, explicit "City, Country", unknown fallback); and the seeded generator (deterministic for the same city+nonce, different across cities, values stay in plausible ranges, forecast max always exceeds min).
2. **Component test** (`tests/App.test.js`) — mounts the full `App.vue` with the API service mocked, and asserts the UI for all four states: empty (pre-search), loading (in-flight request), success (rendered weather + forecast), and error (invalid city triggers the error card).

All 21 tests pass (`npm run test`).

## Design notes

The visual direction leans into the "weather station" idea rather than a generic SaaS dashboard: big display-serif temperature readouts, monospace data labels (humidity/wind/updated-time) styled like instrument readings, and a forecast gauge bar that visualizes each day's min/max against the week's overall range instead of just printing two numbers. The background gradient behind the current-conditions card shifts tone with the reported condition (warm amber-tinted dusk for clear skies, cooler blue-grey for rain/storm) as the page's one deliberate signature touch.
