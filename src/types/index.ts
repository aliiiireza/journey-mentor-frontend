export interface Country {
  name: {
    common: string
    official: string
  }
  population: number
  region: string
  capital: string[]
  flags: {
    png: string
    svg: string
  }
  cca3: string
}

export interface CountryDetail {
  name: {
    common: string
    official: string
    nativeName: Record<string, { common: string; official: string }>
  }
  population: number
  region: string
  subregion: string
  capital: string[]
  flags: {
    png: string
    svg: string
  }
  currencies: Record<string, { name: string; symbol: string }>
  languages: Record<string, string>
  borders: string[]
  tld: string[]
  cca3: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export interface SearchFilters {
  searchQuery: string
  selectedRegion: string
  sortBy: 'name' | 'population'
  sortOrder: 'asc' | 'desc'
}
