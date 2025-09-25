<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import CountryCard from '../components/CountryCard.vue'
import SearchFilter from '../components/SearchFilter.vue'
import Pagination from '../components/Pagination.vue'
import { fetchAllCountries } from '../services/countriesService'
import { filterAndSortCountries, paginateCountries } from '../utils/searchUtils'
import { filtersToQuery, sanitizeQueryParams } from '../utils/urlUtils'
import type { Country, SearchFilters } from '../types'

const router = useRouter()
const route = useRoute()

// State
const countries = ref<Country[]>([])
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)
const itemsPerPage = 24

// Search filters
const searchFilters = ref<SearchFilters>({
  searchQuery: '',
  selectedRegion: '',
  sortBy: 'name',
  sortOrder: 'asc',
})

const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

// Computed properties
const filteredCountries = computed(() => {
  return filterAndSortCountries(countries.value, searchFilters.value)
})

const totalPages = computed(() => {
  return Math.ceil(filteredCountries.value.length / itemsPerPage)
})

const paginatedCountries = computed(() => {
  return paginateCountries(filteredCountries.value, currentPage.value, itemsPerPage)
})

// Methods
const fetchCountries = async () => {
  try {
    loading.value = true
    error.value = ''

    const response = await fetchAllCountries()

    if (response.error) {
      error.value = response.error
    } else {
      countries.value = response.data
    }
  } catch (err) {
    error.value = 'Failed to load countries. Please try again.'
    console.error('Error fetching countries:', err)
  } finally {
    loading.value = false
  }
}

const handleCountryClick = (country: Country) => {
  router.push(`/country/${encodeURIComponent(country.name.common)}`)
}

const handleSearch = (query: string) => {
  searchFilters.value.searchQuery = query
  currentPage.value = 1 // Reset to first page when search changes
}

const handleRegionChange = (region: string) => {
  searchFilters.value.selectedRegion = region
  currentPage.value = 1 // Reset to first page when region changes
}

const handleSort = (sort: 'name' | 'population') => {
  if (searchFilters.value.sortBy === sort) {
    searchFilters.value.sortOrder = searchFilters.value.sortOrder === 'asc' ? 'desc' : 'asc'
  } else {
    searchFilters.value.sortBy = sort
    searchFilters.value.sortOrder = 'asc'
  }
  currentPage.value = 1 // Reset to first page when sorting changes
  updateURL()
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  updateURL()
}

const handlePreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateURL()
  }
}

const handleNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updateURL()
  }
}

const updateURL = () => {
  const query = filtersToQuery(searchFilters.value, currentPage.value)
  router.replace({ query: query as Record<string, string> })
}

const loadFromURL = () => {
  const { filters, currentPage: page } = sanitizeQueryParams(
    route.query as Record<string, string | string[] | undefined>,
  )
  searchFilters.value = filters
  currentPage.value = page
}

// Watchers
watch(
  [() => searchFilters.value, currentPage],
  () => {
    updateURL()
  },
  { deep: true },
)

// Lifecycle
onMounted(() => {
  loadFromURL()
  fetchCountries()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Search and Filter Controls -->
    <SearchFilter
      :search-query="searchFilters.searchQuery"
      :selected-region="searchFilters.selectedRegion"
      :regions="regions"
      :sort-by="searchFilters.sortBy"
      :sort-order="searchFilters.sortOrder"
      @search="handleSearch"
      @region-change="handleRegionChange"
      @sort="handleSort"
    />

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg">Loading countries...</div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="flex justify-center items-center py-20">
      <div class="text-lg text-red-600">{{ error }}</div>
    </div>

    <!-- Countries Grid -->
    <div
      v-else-if="paginatedCountries.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8"
    >
      <CountryCard
        v-for="country in paginatedCountries"
        :key="country.cca3"
        :country="country"
        @click="handleCountryClick(country)"
      />
    </div>

    <!-- No Results State -->
    <div v-else-if="!loading && !error && filteredCountries.length === 0" class="text-center py-20">
      <div class="text-lg">No countries found matching your criteria.</div>
    </div>

    <!-- Pagination -->
    <Pagination
      v-if="!loading && !error && filteredCountries.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="filteredCountries.length"
      :items-per-page="itemsPerPage"
      @page-change="handlePageChange"
      @previous="handlePreviousPage"
      @next="handleNextPage"
    />
  </div>
</template>
