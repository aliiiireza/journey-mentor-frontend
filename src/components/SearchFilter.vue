<script setup lang="ts">
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  searchQuery: string
  selectedRegion: string
  regions: string[]
  sortBy: 'name' | 'population'
  sortOrder: 'asc' | 'desc'
}

defineProps<Props>()

const emit = defineEmits<{
  search: [query: string]
  regionChange: [region: string]
  sort: [sort: 'name' | 'population']
}>()

const handleSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('search', target.value)
}

const handleSortClick = (sort: 'name' | 'population') => {
  emit('sort', sort)
}

const isDropdownOpen = ref(false)

const handleRegionSelect = (region: string) => {
  emit('regionChange', region)
  isDropdownOpen.value = false
}

const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:justify-between sm:items-center">
    <div class="flex flex-col sm:flex-row gap-4 flex-1">
      <div class="relative flex-1 max-w-md">
        <input
          :value="searchQuery"
          @input="handleSearchInput"
          type="text"
          placeholder="Search for a country..."
          class="w-full px-4 py-3 pl-12 bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white rounded-md shadow-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <MagnifyingGlassIcon
          class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
        />
      </div>

      <div class="relative min-w-48">
        <button
          @click="isDropdownOpen = !isDropdownOpen"
          class="w-full px-4 py-3 bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white rounded-md shadow-md border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-between"
        >
          <span>{{ selectedRegion || 'Filter by Region' }}</span>
          <ChevronDownIcon class="w-4 h-4" />
        </button>

        <div
          v-if="isDropdownOpen"
          class="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-dark-blue rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10"
        >
          <button
            @click="handleRegionSelect('')"
            class="w-full px-4 py-2 text-left text-very-dark-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-md"
          >
            All Regions
          </button>
          <button
            v-for="region in regions"
            :key="region"
            @click="handleRegionSelect(region)"
            class="w-full px-4 py-2 text-left text-very-dark-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 last:rounded-b-md"
          >
            {{ region }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex gap-2">
      <button
        @click="handleSortClick('name')"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium transition-colors',
          sortBy === 'name'
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
        ]"
      >
        <div class="flex items-center gap-1">
          <span>Name</span>
          <ChevronUpIcon v-if="sortBy === 'name' && sortOrder === 'asc'" class="w-4 h-4" />
          <ChevronDownIcon v-if="sortBy === 'name' && sortOrder === 'desc'" class="w-4 h-4" />
        </div>
      </button>
      <button
        @click="handleSortClick('population')"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium transition-colors',
          sortBy === 'population'
            ? 'bg-blue-500 text-white'
            : 'bg-white dark:bg-dark-blue text-very-dark-blue dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
        ]"
      >
        <div class="flex items-center gap-1">
          <span>Population</span>
          <ChevronUpIcon v-if="sortBy === 'population' && sortOrder === 'asc'" class="w-4 h-4" />
          <ChevronDownIcon v-if="sortBy === 'population' && sortOrder === 'desc'" class="w-4 h-4" />
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-very-dark-blue {
  color: var(--very-dark-blue-text);
}
</style>
