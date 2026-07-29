/**
 * Formats an ISO date string (e.g. "2026-02-04") into a short weekday label.
 *
 * @param {string} dateIso - ISO date string.
 * @returns {string} e.g. "Mon", "Tue". Returns "--" for invalid input.
 */
export function formatWeekday(dateIso) {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

/**
 * Formats an ISO date string into a "Mon, 4 Feb" style label.
 *
 * @param {string} dateIso - ISO date string.
 * @returns {string} Formatted date label. Returns "--" for invalid input.
 */
export function formatDayLabel(dateIso) {
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return '--'
  return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
}

/**
 * Formats an ISO timestamp into a 12-hour clock time for the
 * "Updated 10:30 AM" style readout.
 *
 * Reads the hour/minute directly from the ISO string rather than
 * converting through the browser's local timezone, so the readout
 * reflects the time the API reported (already localized to the city)
 * regardless of where the app happens to be running.
 *
 * @param {string} isoTimestamp - ISO 8601 timestamp, optionally with offset.
 * @returns {string} e.g. "10:30 AM". Returns "--" for invalid input.
 */
export function formatUpdatedTime(isoTimestamp) {
  const match = /T(\d{2}):(\d{2})/.exec(isoTimestamp ?? '')
  if (!match || Number.isNaN(new Date(isoTimestamp).getTime())) return '--'
  const hour24 = Number(match[1])
  const minute = match[2]
  const period = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return `${hour12}:${minute} ${period}`
}
