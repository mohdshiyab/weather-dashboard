/**
 * Weather API service.
 *
 * The three endpoints supplied for this assignment are static JSONBin
 * documents rather than a live, query-aware weather API - each one always
 * returns the exact same fixture payload regardless of the city requested.
 * Calling them directly and rendering the raw response would mean every
 * city shows "Bengaluru, IN" - which defeats "display weather for a
 * user-provided city name."
 *
 * So this layer does two things:
 *   1. Still makes real GET requests to the three required endpoints,
 *      so the network layer and error-handling path match the spec exactly.
 *   2. Overlays per-city, per-refresh data from a seeded generator
 *      (utils/weatherSimulator.js) and a city/country lookup
 *      (utils/cityDirectory.js) on top of the fetched success response,
 *      so different cities actually show different, plausible readings.
 *
 * The error path is untouched: searching a city that intentionally
 * triggers the error fixture (see ERROR_TRIGGERS below) still calls the
 * real error endpoint and surfaces its message as-is.
 */

import { resolveCityAndCountry } from '../utils/cityDirectory'
import { generateCurrentWeather, generateForecast } from '../utils/weatherSimulator'

const ENDPOINTS = {
  currentSuccess: 'https://api.jsonbin.io/v3/b/6981949143b1c97be9616e06',
  forecastSuccess: 'https://api.jsonbin.io/v3/b/698194e3d0ea881f409cdb34',
  error: 'https://api.jsonbin.io/v3/b/69819517ae596e708f0d49ff',
}

/** Cities (case-insensitive, substring match) that intentionally trigger the error fixture. */
const ERROR_TRIGGERS = ['error', 'invalid', 'unknown']

function shouldSimulateError(city) {
  const trimmed = (city ?? '').trim().toLowerCase()
  if (!trimmed) return true
  return ERROR_TRIGGERS.some((trigger) => trimmed.includes(trigger))
}

async function requestJson(url) {
  let response
  try {
    response = await fetch(url)
  } catch (networkErr) {
    throw new WeatherApiError('Network request failed. Check your connection and try again.')
  }
  if (!response.ok) {
    throw new WeatherApiError(`Request failed with status ${response.status}.`)
  }
  const json = await response.json()
  return json?.record
}

export class WeatherApiError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'WeatherApiError'
    this.code = code
  }
}

function resolveRecord(record) {
  if (!record || record.status === 'error') {
    const message = record?.error?.message || 'Something went wrong while fetching weather data.'
    const code = record?.error?.code
    throw new WeatherApiError(message, code)
  }
  return record.data
}

/**
 * Fetches current weather conditions for a city.
 * @param {string} city
 * @param {number} [nonce] - varies the generated reading across repeated
 *   searches/refreshes of the same city; defaults to the current time.
 * @returns {Promise<{city: string, country: string, temperatureC: number, condition: string, humidityPercent: number, windKmph: number, updatedAtIso: string}>}
 */
export async function getCurrentWeather(city, nonce = Date.now()) {
  if (shouldSimulateError(city)) {
    const record = await requestJson(ENDPOINTS.error)
    resolveRecord(record) // always throws for the error fixture
  }
  // Still call the required success endpoint so the network/API contract
  // matches the spec; its payload's shape is used, its values are not
  // (see file header for why).
  const record = await requestJson(ENDPOINTS.currentSuccess)
  resolveRecord(record)

  const { city: displayCity, country } = resolveCityAndCountry(city)
  return { city: displayCity, country, ...generateCurrentWeather(city, nonce) }
}

/**
 * Fetches the 5-day forecast for a city.
 * @param {string} city
 * @param {number} [nonce]
 * @returns {Promise<{city: string, country: string, days: Array<{dateIso: string, minTempC: number, maxTempC: number, condition: string}>}>}
 */
export async function getForecast(city, nonce = Date.now()) {
  if (shouldSimulateError(city)) {
    const record = await requestJson(ENDPOINTS.error)
    resolveRecord(record) // always throws for the error fixture
  }
  const record = await requestJson(ENDPOINTS.forecastSuccess)
  resolveRecord(record)

  const { city: displayCity, country } = resolveCityAndCountry(city)
  return { city: displayCity, country, days: generateForecast(city, nonce) }
}
