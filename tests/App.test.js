import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import App from '../src/App.vue'
import * as weatherAPI from '../src/services/weatherAPI'

vi.mock('../src/services/weatherAPI', async () => {
  const actual = await vi.importActual('../src/services/weatherAPI')
  return {
    ...actual,
    getCurrentWeather: vi.fn(),
    getForecast: vi.fn(),
  }
})

const CURRENT_FIXTURE = {
  city: 'Bengaluru',
  country: 'IN',
  temperatureC: 29,
  condition: 'Partly Cloudy',
  humidityPercent: 62,
  windKmph: 10,
  updatedAtIso: '2026-02-03T10:30:00+05:30',
}

const FORECAST_FIXTURE = {
  city: 'Bengaluru',
  country: 'IN',
  days: [
    { dateIso: '2026-02-03', minTempC: 21, maxTempC: 28, condition: 'Cloudy' },
    { dateIso: '2026-02-04', minTempC: 22, maxTempC: 30, condition: 'Sunny' },
    { dateIso: '2026-02-05', minTempC: 20, maxTempC: 27, condition: 'Rain' },
    { dateIso: '2026-02-06', minTempC: 21, maxTempC: 29, condition: 'Windy' },
    { dateIso: '2026-02-07', minTempC: 23, maxTempC: 31, condition: 'Sunny' },
  ],
}

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  vi.clearAllMocks()
})

describe('App weather UI states', () => {
  it('shows the empty state before any search has run', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('Search a city to see the weather')
  })

  it('shows a loading state while the request is in flight', async () => {
    let resolveCurrent
    weatherAPI.getCurrentWeather.mockReturnValue(
      new Promise((resolve) => {
        resolveCurrent = resolve
      }),
    )
    weatherAPI.getForecast.mockResolvedValue(FORECAST_FIXTURE)

    const wrapper = mount(App)
    await wrapper.find('input[aria-label="Search city"]').setValue('Bengaluru')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.find('[role="status"]').exists()).toBe(true)

    resolveCurrent(CURRENT_FIXTURE)
    await flushPromises()
  })

  it('renders current weather and forecast on a successful search', async () => {
    weatherAPI.getCurrentWeather.mockResolvedValue(CURRENT_FIXTURE)
    weatherAPI.getForecast.mockResolvedValue(FORECAST_FIXTURE)

    const wrapper = mount(App)
    await wrapper.find('input[aria-label="Search city"]').setValue('Bengaluru')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.text()).toContain('Bengaluru')
    expect(wrapper.text()).toContain('29°C')
    expect(wrapper.text()).toContain('5-Day Forecast')
  })

  it('shows the error state when the API returns an error', async () => {
    weatherAPI.getCurrentWeather.mockRejectedValue(
      new weatherAPI.WeatherApiError('City not found. Please enter a valid city name.'),
    )
    weatherAPI.getForecast.mockRejectedValue(
      new weatherAPI.WeatherApiError('City not found. Please enter a valid city name.'),
    )

    const wrapper = mount(App)
    await wrapper.find('input[aria-label="Search city"]').setValue('invalid')
    await wrapper.find('form').trigger('submit.prevent')
    await flushPromises()

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('City not found')
  })
})
