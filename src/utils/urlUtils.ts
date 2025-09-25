import type { SearchFilters } from '../types'

export interface URLQueryParams {
  search?: string
  region?: string
  sortBy?: string
  sortOrder?: string
  page?: string
}

/**
 * Convert search filters to URL query parameters
 */
export const filtersToQuery = (filters: SearchFilters, currentPage: number): URLQueryParams => {
  const query: URLQueryParams = {}
  
  if (filters.searchQuery) query.search = filters.searchQuery
  if (filters.selectedRegion) query.region = filters.selectedRegion
  if (filters.sortBy !== 'name') query.sortBy = filters.sortBy
  if (filters.sortOrder !== 'asc') query.sortOrder = filters.sortOrder
  if (currentPage !== 1) query.page = currentPage.toString()
  
  return query
}

/**
 * Parse URL query parameters to search filters
 */
export const queryToFilters = (query: Record<string, string | string[] | undefined>): {
  filters: SearchFilters
  currentPage: number
} => {
  const filters: SearchFilters = {
    searchQuery: (query.search as string) || '',
    selectedRegion: (query.region as string) || '',
    sortBy: (query.sortBy as 'name' | 'population') || 'name',
    sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc'
  }
  
  const currentPage = parseInt(query.page as string) || 1
  
  return { filters, currentPage }
}

/**
 * Validate and sanitize query parameters
 */
export const sanitizeQueryParams = (query: Record<string, string | string[] | undefined>): {
  filters: SearchFilters
  currentPage: number
} => {
  const { filters, currentPage } = queryToFilters(query)
  
  // Validate sortBy
  if (!['name', 'population'].includes(filters.sortBy)) {
    filters.sortBy = 'name'
  }
  
  // Validate sortOrder
  if (!['asc', 'desc'].includes(filters.sortOrder)) {
    filters.sortOrder = 'asc'
  }
  
  // Validate currentPage
  const validPage = Math.max(1, currentPage)
  
  return { filters, currentPage: validPage }
}
