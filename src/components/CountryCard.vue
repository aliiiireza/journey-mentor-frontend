<script setup lang="ts">
import LazyImage from './LazyImage.vue'

interface Country {
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

interface Props {
  country: Country
}

defineProps<Props>()

const emit = defineEmits<{
  click: [country: Country]
}>()

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}
</script>

<template>
  <div
    class="bg-white dark:bg-dark-blue rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
    @click="emit('click', country)"
  >
    <LazyImage
      :src="country.flags.png"
      :alt="`${country.name.common} flag`"
      class="aspect-[4/3] w-full h-auto object-cover"
    />
    <div class="p-6">
      <h3 class="text-lg font-bold text-very-dark-blue dark:text-white mb-4">
        {{ country.name.common }}
      </h3>
      <div class="space-y-2 text-sm">
        <div class="flex items-center">
          <span class="font-semibold text-very-dark-blue dark:text-white mr-2">Population:</span>
          <span class="text-very-dark-blue dark:text-white">{{
            formatNumber(country.population)
          }}</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-very-dark-blue dark:text-white mr-2">Region:</span>
          <span class="text-very-dark-blue dark:text-white">{{ country.region }}</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold text-very-dark-blue dark:text-white mr-2">Capital:</span>
          <span class="text-very-dark-blue dark:text-white">{{
            country.capital?.[0] || 'N/A'
          }}</span>
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
