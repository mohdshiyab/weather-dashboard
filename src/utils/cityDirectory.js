/**
 * Resolves a free-typed city search into a display-ready {city, country} pair.
 *
 * The assignment's weather endpoints are static fixtures (see weatherAPI.js),
 * so there is no live geocoding API backing this. To still show a correct
 * country for the city the person actually searched, this module:
 *   1. Honors an explicit "City, Country" input as-is (highest priority).
 *   2. Falls back to a curated lookup table of common cities.
 *   3. Falls back to just the city name with no country if neither matches.
 */

/** city name (lowercase, no diacritics) -> country name */
const CITY_COUNTRY = {
  bengaluru: 'India', bangalore: 'India', mumbai: 'India', delhi: 'India',
  'new delhi': 'India', chennai: 'India', kolkata: 'India', hyderabad: 'India',
  pune: 'India', ahmedabad: 'India', jaipur: 'India', lucknow: 'India',
  mangalore: 'India', kochi: 'India', surat: 'India', chandigarh: 'India',
  'new york': 'United States', 'los angeles': 'United States', chicago: 'United States',
  houston: 'United States', phoenix: 'United States', 'san francisco': 'United States',
  seattle: 'United States', boston: 'United States', miami: 'United States',
  'las vegas': 'United States', denver: 'United States', austin: 'United States',
  dallas: 'United States', atlanta: 'United States', washington: 'United States',
  london: 'United Kingdom', manchester: 'United Kingdom', birmingham: 'United Kingdom',
  liverpool: 'United Kingdom', edinburgh: 'United Kingdom', glasgow: 'United Kingdom',
  paris: 'France', marseille: 'France', lyon: 'France', nice: 'France',
  berlin: 'Germany', munich: 'Germany', hamburg: 'Germany', frankfurt: 'Germany',
  cologne: 'Germany', stuttgart: 'Germany',
  madrid: 'Spain', barcelona: 'Spain', valencia: 'Spain', seville: 'Spain',
  rome: 'Italy', milan: 'Italy', naples: 'Italy', venice: 'Italy', florence: 'Italy',
  lisbon: 'Portugal', porto: 'Portugal',
  amsterdam: 'Netherlands', rotterdam: 'Netherlands',
  brussels: 'Belgium', zurich: 'Switzerland', geneva: 'Switzerland',
  vienna: 'Austria', dublin: 'Ireland', copenhagen: 'Denmark',
  stockholm: 'Sweden', oslo: 'Norway', helsinki: 'Finland',
  warsaw: 'Poland', prague: 'Czech Republic', budapest: 'Hungary',
  athens: 'Greece', istanbul: 'Turkey', ankara: 'Turkey',
  moscow: 'Russia', 'saint petersburg': 'Russia', 'st petersburg': 'Russia',
  kyiv: 'Ukraine', kiev: 'Ukraine',
  cairo: 'Egypt', 'cape town': 'South Africa', johannesburg: 'South Africa',
  lagos: 'Nigeria', nairobi: 'Kenya', casablanca: 'Morocco', tunis: 'Tunisia',
  dubai: 'United Arab Emirates', 'abu dhabi': 'United Arab Emirates',
  doha: 'Qatar', riyadh: 'Saudi Arabia', jeddah: 'Saudi Arabia',
  'tel aviv': 'Israel', jerusalem: 'Israel', amman: 'Jordan', beirut: 'Lebanon',
  karachi: 'Pakistan', lahore: 'Pakistan', islamabad: 'Pakistan',
  dhaka: 'Bangladesh', colombo: 'Sri Lanka', kathmandu: 'Nepal',
  beijing: 'China', shanghai: 'China', shenzhen: 'China', guangzhou: 'China',
  'hong kong': 'China', chengdu: 'China', xian: 'China',
  tokyo: 'Japan', osaka: 'Japan', kyoto: 'Japan', yokohama: 'Japan', nagoya: 'Japan',
  seoul: 'South Korea', busan: 'South Korea',
  taipei: 'Taiwan', bangkok: 'Thailand', 'chiang mai': 'Thailand',
  singapore: 'Singapore', 'kuala lumpur': 'Malaysia', jakarta: 'Indonesia',
  bali: 'Indonesia', manila: 'Philippines', 'ho chi minh city': 'Vietnam',
  hanoi: 'Vietnam', yangon: 'Myanmar', 'phnom penh': 'Cambodia',
  sydney: 'Australia', melbourne: 'Australia', brisbane: 'Australia',
  perth: 'Australia', adelaide: 'Australia', auckland: 'New Zealand',
  wellington: 'New Zealand',
  toronto: 'Canada', vancouver: 'Canada', montreal: 'Canada', ottawa: 'Canada',
  calgary: 'Canada',
  'mexico city': 'Mexico', guadalajara: 'Mexico', monterrey: 'Mexico',
  'sao paulo': 'Brazil', 'rio de janeiro': 'Brazil', brasilia: 'Brazil',
  'buenos aires': 'Argentina', santiago: 'Chile', lima: 'Peru',
  bogota: 'Colombia', caracas: 'Venezuela', quito: 'Ecuador',
  havana: 'Cuba', kingston: 'Jamaica',
}

function stripDiacritics(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function titleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * @param {string} rawInput - whatever the person typed into the search box.
 * @returns {{ city: string, country: string }} country is '' when unknown.
 */
export function resolveCityAndCountry(rawInput) {
  const trimmed = (rawInput ?? '').trim()

  // Explicit "City, Country" input always wins.
  if (trimmed.includes(',')) {
    const [cityPart, ...rest] = trimmed.split(',')
    const countryPart = rest.join(',').trim()
    return { city: titleCase(cityPart.trim()), country: titleCase(countryPart) }
  }

  const key = stripDiacritics(trimmed).toLowerCase()
  const country = CITY_COUNTRY[key] ?? ''
  return { city: titleCase(trimmed), country }
}
