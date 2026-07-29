import { describe, it, expect } from 'vitest'
import { resolveCityAndCountry } from '../src/utils/cityDirectory'
import { generateCurrentWeather, generateForecast } from '../src/utils/weatherSimulator'

describe('resolveCityAndCountry', () => {
  it('looks up the country for a known city', () => {
    expect(resolveCityAndCountry('Tokyo')).toEqual({ city: 'Tokyo', country: 'Japan' })
    expect(resolveCityAndCountry('bengaluru')).toEqual({ city: 'Bengaluru', country: 'India' })
  })

  it('honors an explicit "City, Country" input over the lookup table', () => {
    expect(resolveCityAndCountry('Springfield, Narnia')).toEqual({
      city: 'Springfield',
      country: 'Narnia',
    })
  })

  it('falls back to an empty country for an unrecognized city', () => {
    expect(resolveCityAndCountry('Zzyzxville')).toEqual({ city: 'Zzyzxville', country: '' })
  })
})

describe('generateCurrentWeather', () => {
  it('is deterministic for the same city and nonce', () => {
    const first = generateCurrentWeather('Paris', 42)
    const second = generateCurrentWeather('Paris', 42)
    expect(second.temperatureC).toBe(first.temperatureC)
    expect(second.humidityPercent).toBe(first.humidityPercent)
    expect(second.windKmph).toBe(first.windKmph)
    expect(second.condition).toBe(first.condition)
  })

  it('produces different readings for different cities with the same nonce', () => {
    const paris = generateCurrentWeather('Paris', 1)
    const tokyo = generateCurrentWeather('Tokyo', 1)
    const isDifferent =
      paris.temperatureC !== tokyo.temperatureC ||
      paris.humidityPercent !== tokyo.humidityPercent ||
      paris.condition !== tokyo.condition
    expect(isDifferent).toBe(true)
  })

  it('keeps generated values within plausible ranges', () => {
    const reading = generateCurrentWeather('Nairobi', 7)
    expect(reading.temperatureC).toBeGreaterThanOrEqual(8)
    expect(reading.temperatureC).toBeLessThanOrEqual(35)
    expect(reading.humidityPercent).toBeGreaterThanOrEqual(35)
    expect(reading.humidityPercent).toBeLessThanOrEqual(90)
  })
})

describe('generateForecast', () => {
  it('returns 5 days with max temperature never below min temperature', () => {
    const days = generateForecast('Oslo', 3)
    expect(days).toHaveLength(5)
    days.forEach((day) => {
      expect(day.maxTempC).toBeGreaterThan(day.minTempC)
    })
  })

  it('is deterministic for the same city and nonce', () => {
    const first = generateForecast('Cairo', 9)
    const second = generateForecast('Cairo', 9)
    expect(second).toEqual(first)
  })
})
