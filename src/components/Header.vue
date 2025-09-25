<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'

interface Props {
  isDarkMode: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  toggleTheme: []
}>()

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <header class="bg-white dark:bg-dark-blue shadow-md">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <h1
          @click="goToHome"
          class="text-lg font-bold text-very-dark-blue dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
        >
          Where in the world?
        </h1>
        <button
          @click="emit('toggleTheme')"
          class="flex items-center gap-2 text-sm font-semibold text-very-dark-blue dark:text-white hover:opacity-80 transition-opacity"
        >
          <MoonIcon v-if="isDarkMode" class="w-4 h-4" />
          <SunIcon v-else class="w-4 h-4" />
          {{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.text-very-dark-blue {
  color: var(--very-dark-blue-text);
}
</style>
