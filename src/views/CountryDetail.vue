<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { fetchCountryByName, fetchBorderCountries } from '../services/countriesService'
import type { CountryDetail, Country } from '../types'

const router = useRouter()
const route = useRoute()
const country = ref<CountryDetail | null>(null)
const borderCountries = ref<Country[]>([])
const loading = ref(true)
const error = ref('')

const countryName = computed(() => route.params.name as string)

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}

const formatCurrencies = (currencies: Record<string, { name: string; symbol: string }>): string => {
  return Object.values(currencies)
    .map((c) => c.name)
    .join(', ')
}

const formatLanguages = (languages: Record<string, string>): string => {
  return Object.values(languages).join(', ')
}

const formatNativeNames = (
  nativeNames: Record<string, { common: string; official: string }>,
): string => {
  return Object.values(nativeNames)
    .map((n) => n.common)
    .join(', ')
}

const fetchCountry = async () => {
  try {
    loading.value = true
    error.value = ''

    // Fetch country details
    const countryResponse = await fetchCountryByName(countryName.value)

    if (countryResponse.error) {
      error.value = countryResponse.error
      return
    }

    country.value = countryResponse.data

    // Fetch border countries if borders exist
    if (country.value?.borders?.length) {
      const borderResponse = await fetchBorderCountries(country.value.borders)

      if (borderResponse.error) {
        console.warn('Failed to fetch border countries:', borderResponse.error)
      } else {
        borderCountries.value = borderResponse.data
      }
    }
  } catch (err) {
    error.value = 'Country not found'
    console.error('Error fetching country:', err)
  } finally {
    loading.value = false
  }
}

const handleBorderCountryClick = (borderCountry: Country) => {
  router.push(`/country/${encodeURIComponent(borderCountry.name.common)}`)
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchCountry()
})

// Watch for route parameter changes and refetch data
watch(
  () => route.params.name,
  () => {
    fetchCountry()
  },
  { immediate: false },
)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <button
      @click="goBack"
      class="flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white rounded-md shadow-md hover:shadow-lg transition-shadow mb-12"
    >
      ← Back
    </button>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-lg">Loading country details...</div>
    </div>

    <div v-else-if="error" class="flex justify-center items-center py-20">
      <div class="text-lg text-red-600">{{ error }}</div>
    </div>

    <div v-else-if="country" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div class="aspect-[4/3] overflow-hidden rounded-lg">
        <img
          :src="country.flags.png"
          :alt="`${country.name.common} flag`"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="space-y-8">
        <div>
          <h1 class="text-3xl font-bold text-very-dark-blue dark:text-white mb-6">
            {{ country.name.common }}
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Native Name:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ formatNativeNames(country.name.nativeName) }}
                </span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Population:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ formatNumber(country.population) }}
                </span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Region:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">{{ country.region }}</span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Sub Region:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">{{
                  country.subregion
                }}</span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Capital:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ country.capital?.join(', ') || 'N/A' }}
                </span>
              </div>
            </div>

            <div class="space-y-3">
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white"
                  >Top Level Domain:</span
                >
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ country.tld?.join(', ') || 'N/A' }}
                </span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Currencies:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ formatCurrencies(country.currencies) }}
                </span>
              </div>
              <div>
                <span class="font-semibold text-very-dark-blue dark:text-white">Languages:</span>
                <span class="ml-2 text-very-dark-blue dark:text-white">
                  {{ formatLanguages(country.languages) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="borderCountries.length > 0">
          <h3 class="text-lg font-semibold text-very-dark-blue dark:text-white mb-4">
            Border Countries:
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="borderCountry in borderCountries"
              :key="borderCountry.cca3"
              @click="handleBorderCountryClick(borderCountry)"
              class="px-4 py-2 bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white rounded-md shadow-md hover:shadow-lg transition-shadow text-sm"
            >
              {{ borderCountry.name.common }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-very-dark-blue {
  color: var(--very-dark-blue-text);
}
</style>
