import { describe, it, expect } from 'vitest'
import { formatTemp, formatTempRange } from '../src/utils/formatTemp'
import { formatWeekday, formatUpdatedTime } from '../src/utils/formatDate'

describe('formatTemp', () => {
  it('rounds and appends the °C unit', () => {
    expect(formatTemp(28.6)).toBe('29°C')
    expect(formatTemp(-3.2)).toBe('-3°C')
  })

  it('omits the unit letter when withUnit is false', () => {
    expect(formatTemp(21, { withUnit: false })).toBe('21°')
  })

  it('returns a placeholder for invalid input', () => {
    expect(formatTemp(null)).toBe('--')
    expect(formatTemp(undefined)).toBe('--')
    expect(formatTemp(NaN)).toBe('--')
  })
})

describe('formatTempRange', () => {
  it('formats a min/max pair as "min° / max°C"', () => {
    expect(formatTempRange(21, 28)).toBe('21° / 28°C')
  })

  it('returns a placeholder when either value is invalid', () => {
    expect(formatTempRange(null, 28)).toBe('--')
  })
})

describe('formatWeekday', () => {
  it('formats an ISO date into a short weekday label', () => {
    // 2026-02-04 is a Wednesday
    expect(formatWeekday('2026-02-04')).toBe('Wed')
  })

  it('returns a placeholder for an invalid date', () => {
    expect(formatWeekday('not-a-date')).toBe('--')
  })
})

describe('formatUpdatedTime', () => {
  it('formats an ISO timestamp into a 12-hour clock reading', () => {
    expect(formatUpdatedTime('2026-02-03T10:30:00+05:30')).toMatch(/10:30\s?AM/)
  })

  it('returns a placeholder for an invalid timestamp', () => {
    expect(formatUpdatedTime('nope')).toBe('--')
  })
})
