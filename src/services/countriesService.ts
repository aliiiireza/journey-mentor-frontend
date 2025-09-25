import type { Country, CountryDetail } from '../types'

const API_BASE_URL = 'https://restcountries.com/v3.1'

export interface CountriesResponse {
  data: Country[]
  error: string | null
}

export interface CountryDetailResponse {
  data: CountryDetail | null
  error: string | null
}

export const fetchAllCountries = async (): Promise<CountriesResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/all?fields=name,population,region,capital,flags,cca3`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      data,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching countries:', error)
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch countries',
    }
  }
}

export const fetchCountryByName = async (name: string): Promise<CountryDetailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/name/${encodeURIComponent(name)}?fullText=true`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const country = data[0] || null

    return {
      data: country,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching country by name:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch country',
    }
  }
}

export const fetchBorderCountries = async (borderCodes: string[]): Promise<CountriesResponse> => {
  try {
    if (borderCodes.length === 0) {
      return { data: [], error: null }
    }

    const response = await fetch(`${API_BASE_URL}/alpha?codes=${borderCodes.join(',')}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      data,
      error: null,
    }
  } catch (error) {
    console.error('Error fetching border countries:', error)
    return {
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch border countries',
    }
  }
}
