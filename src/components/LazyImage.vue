<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt: string
  class?: string
}

const props = defineProps<Props>()

const imageRef = ref<HTMLImageElement>()
const isLoaded = ref(false)
const isInView = ref(false)

const observer = ref<IntersectionObserver>()

onMounted(() => {
  if (imageRef.value) {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInView.value = true
            observer.value?.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.value.observe(imageRef.value)
  }
})

onUnmounted(() => {
  observer.value?.disconnect()
})

const handleLoad = () => {
  isLoaded.value = true
}
</script>

<template>
  <div ref="imageRef" :class="props.class">
    <div v-if="!isInView" class="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
      <div class="text-gray-400">Loading...</div>
    </div>
    <img
      v-else
      :src="src"
      :alt="alt"
      :class="props.class"
      loading="lazy"
      @load="handleLoad"
      :style="{ opacity: isLoaded ? 1 : 0 }"
      class="transition-opacity duration-300"
    />
  </div>
</template>
