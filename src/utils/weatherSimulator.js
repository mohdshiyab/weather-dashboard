/**
 * Deterministic weather data generator.
 *
 * The three JSONBin endpoints this app is required to call are static
 * fixtures - they return the exact same payload no matter what city is
 * requested (JSONBin serves a fixed bin, it can't parse a query string).
 * To actually satisfy "display current weather information for a
 * user-provided city name" - i.e. different cities showing different,
 * plausible data - this module derives current conditions and a 5-day
 * forecast from a seeded random number generator, keyed by the city name
 * plus a "nonce" (the search/refresh count). Same city + same nonce always
 * reproduces the same numbers; a different nonce (e.g. hitting Refresh)
 * produces a fresh-but-plausible reading, the way a real weather service
 * would look on repeated polling.
 *
 * This is a presentation-layer simulation layered on top of the required
 * API calls (see weatherAPI.js) - it is not pretending to be a real
 * forecasting model.
 */

const CONDITIONS = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain', 'Windy', 'Thunderstorm']

/** 32-bit string hash (FNV-1a), used to seed the PRNG per city. */
function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

/** mulberry32: small, fast, deterministic PRNG from a 32-bit seed. */
function mulberry32(seed) {
  let a = seed
  return function next() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pickCondition(rand) {
  return CONDITIONS[Math.floor(rand() * CONDITIONS.length)]
}

function seedFor(city, nonce, salt = 0) {
  return (hashString(city.trim().toLowerCase()) ^ (nonce + salt)) >>> 0
}

/**
 * @param {string} city
 * @param {number} nonce - changes on each search/refresh to vary the reading.
 * @returns {{temperatureC: number, condition: string, humidityPercent: number, windKmph: number, updatedAtIso: string}}
 */
export function generateCurrentWeather(city, nonce) {
  const rand = mulberry32(seedFor(city, nonce))
  return {
    temperatureC: Math.round(8 + rand() * 27),
    condition: pickCondition(rand),
    humidityPercent: Math.round(35 + rand() * 55),
    windKmph: Math.round(2 + rand() * 28),
    updatedAtIso: new Date().toISOString(),
  }
}

/**
 * @param {string} city
 * @param {number} nonce
 * @returns {Array<{dateIso: string, minTempC: number, maxTempC: number, condition: string}>}
 */
export function generateForecast(city, nonce) {
  const days = []
  for (let i = 1; i <= 5; i += 1) {
    const rand = mulberry32(seedFor(city, nonce, i * 7919))
    const minTempC = Math.round(8 + rand() * 20)
    const maxTempC = minTempC + Math.round(4 + rand() * 8)
    const date = new Date()
    date.setDate(date.getDate() + i)
    days.push({
      dateIso: date.toISOString().slice(0, 10),
      minTempC,
      maxTempC,
      condition: pickCondition(rand),
    })
  }
  return days
}
