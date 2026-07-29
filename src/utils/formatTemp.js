/**
 * Formats a Celsius temperature value for display.
 * Rounds to the nearest whole degree and appends the ° symbol.
 *
 * @param {number} celsius - Temperature in Celsius.
 * @param {object} [options]
 * @param {boolean} [options.withUnit=true] - Whether to append the "C" unit letter.
 * @returns {string} Formatted temperature, e.g. "28°C". Returns "--" for invalid input.
 */
export function formatTemp(celsius, { withUnit = true } = {}) {
  if (celsius === null || celsius === undefined || Number.isNaN(Number(celsius))) {
    return '--'
  }
  const rounded = Math.round(Number(celsius))
  return withUnit ? `${rounded}°C` : `${rounded}°`
}

/**
 * Formats a min/max temperature pair as a compact range string.
 *
 * @param {number} min - Minimum temperature in Celsius.
 * @param {number} max - Maximum temperature in Celsius.
 * @returns {string} e.g. "21° / 28°C"
 */
export function formatTempRange(min, max) {
  if ([min, max].some((v) => v === null || v === undefined || Number.isNaN(Number(v)))) {
    return '--'
  }
  return `${formatTemp(min, { withUnit: false })} / ${formatTemp(max)}`
}
