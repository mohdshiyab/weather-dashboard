/**
 * Maps a weather condition string to the Tailwind background-gradient
 * utility that should paint the "sky" behind the current-weather panel.
 * This is the app's signature touch: the panel's atmosphere visually
 * matches the reported condition instead of staying a static color.
 *
 * @param {string} condition
 * @returns {string} Tailwind class name.
 */
export function skyClassFor(condition = '') {
  if (/storm|thunder/i.test(condition)) return 'bg-sky-storm'
  if (/rain|drizzle|shower|snow|sleet/i.test(condition)) return 'bg-sky-rain'
  if (/cloud|overcast|fog|mist|wind/i.test(condition)) return 'bg-sky-cloud'
  return 'bg-sky-clear'
}
