<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationProps } from '../types'

interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'page-change': [page: number]
  previous: []
  next: []
}>()

const paginationInfo = computed(() => {
  const start = (props.currentPage - 1) * props.itemsPerPage + 1
  const end = Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
  return { start, end }
})

const visiblePages = computed(() => {
  const maxVisible = 5
  const pages = []

  if (props.totalPages <= maxVisible) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Show first few pages
    for (let i = 1; i <= Math.min(3, props.totalPages); i++) {
      pages.push(i)
    }

    // Show ellipsis if needed
    if (props.currentPage > 4) {
      pages.push('...')
    }

    // Show current page and surrounding pages
    if (props.currentPage > 3 && props.currentPage < props.totalPages - 2) {
      pages.push(props.currentPage)
    }

    // Show last few pages
    if (props.currentPage < props.totalPages - 2) {
      pages.push('...')
    }

    for (
      let i = Math.max(props.totalPages - 2, props.currentPage + 1);
      i <= props.totalPages;
      i++
    ) {
      if (!pages.includes(i)) {
        pages.push(i)
      }
    }
  }

  return pages
})

const handlePageClick = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const handlePrevious = () => {
  if (props.currentPage > 1) {
    emit('previous')
  }
}

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit('next')
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex flex-col items-center space-y-4 mt-4">
    <!-- Pagination Controls -->
    <div class="flex justify-center items-center space-x-2">
      <button
        @click="handlePrevious"
        :disabled="currentPage === 1"
        class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 bg-white dark:bg-dark-blue border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div class="flex space-x-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          @click="handlePageClick(page as number)"
          :disabled="page === '...'"
          :class="[
            'px-3 py-2 text-sm font-medium rounded-md',
            page === '...'
              ? 'text-gray-500 dark:text-gray-400 cursor-default'
              : currentPage === page
                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-blue border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
          ]"
        >
          {{ page }}
        </button>
      </div>

      <button
        @click="handleNext"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 bg-white dark:bg-dark-blue border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>

    <!-- Pagination Info -->
    <div class="text-center text-sm text-gray-600 dark:text-gray-300">
      Showing {{ paginationInfo.start }} to {{ paginationInfo.end }} of {{ totalItems }} countries
    </div>
  </div>
</template>
