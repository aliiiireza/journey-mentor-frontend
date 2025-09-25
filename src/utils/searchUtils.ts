import type { Country, SearchFilters } from '../types'

/**
 * Calculate string similarity using Levenshtein distance
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))

  for (let i = 0; i <= str1.length; i++) {
    matrix[0][i] = i
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[j][0] = j
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + cost, // substitution
      )
    }
  }

  const maxLength = Math.max(str1.length, str2.length)
  return maxLength === 0 ? 1 : (maxLength - matrix[str2.length][str1.length]) / maxLength
}

/**
 * Fuzzy search utility function
 */
export const fuzzyMatch = (
  searchTerm: string,
  target: string,
  threshold: number = 0.6,
): boolean => {
  const search = searchTerm.toLowerCase()
  const targetLower = target.toLowerCase()

  // Exact match first
  if (targetLower.includes(search)) {
    return true
  }

  // Calculate similarity using Levenshtein distance
  const similarity = calculateSimilarity(search, targetLower)

  return similarity >= threshold
}

/**
 * Filter countries based on search query
 */
export const filterCountriesBySearch = (countries: Country[], searchQuery: string): Country[] => {
  if (!searchQuery.trim()) {
    return countries
  }

  return countries.filter(
    (country) =>
      fuzzyMatch(searchQuery, country.name.common) ||
      fuzzyMatch(searchQuery, country.name.official),
  )
}

/**
 * Filter countries by region
 */
export const filterCountriesByRegion = (countries: Country[], region: string): Country[] => {
  if (!region || region === 'All') {
    return countries
  }

  return countries.filter((country) => country.region === region)
}

/**
 * Sort countries based on sort criteria
 */
export const sortCountries = (
  countries: Country[],
  sortBy: 'name' | 'population',
  sortOrder: 'asc' | 'desc',
): Country[] => {
  return [...countries].sort((a, b) => {
    let comparison = 0

    if (sortBy === 'name') {
      comparison = a.name.common.localeCompare(b.name.common)
    } else if (sortBy === 'population') {
      comparison = a.population - b.population
    }

    return sortOrder === 'asc' ? comparison : -comparison
  })
}

/**
 * Apply all filters and sorting to countries
 */
export const filterAndSortCountries = (countries: Country[], filters: SearchFilters): Country[] => {
  let filtered = countries

  // Apply search filter
  filtered = filterCountriesBySearch(filtered, filters.searchQuery)

  // Apply region filter
  filtered = filterCountriesByRegion(filtered, filters.selectedRegion)

  // Apply sorting
  filtered = sortCountries(filtered, filters.sortBy, filters.sortOrder)

  return filtered
}

/**
 * Paginate countries
 */
export const paginateCountries = (
  countries: Country[],
  currentPage: number,
  itemsPerPage: number,
): Country[] => {
  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  return countries.slice(start, end)
}
