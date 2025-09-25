<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Header from './components/Header.vue'

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  updateTheme()
}

const updateTheme = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDarkMode.value = true
  }
  updateTheme()
})
</script>

<template>
  <div
    class="min-h-screen bg-[#FAFAFA] dark:bg-[#202D36] text-light-text dark:text-white transition-colors"
  >
    <Header :is-dark-mode="isDarkMode" @toggle-theme="toggleTheme" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
}

:root {
  --dark-blue: hsl(209, 23%, 22%);
  --very-dark-blue: hsl(207, 26%, 17%);
  --very-dark-blue-text: hsl(200, 15%, 8%);
  --dark-gray: hsl(0, 0%, 52%);
  --very-light-gray: hsl(0, 0%, 98%);
  --white: hsl(0, 0%, 100%);
}

.light-bg {
  background-color: var(--very-light-gray);
}

.dark-bg {
  background-color: var(--very-dark-blue);
}

.light-text {
  color: var(--very-dark-blue-text);
}

.dark-text {
  color: var(--white);
}

.dark-element {
  background-color: var(--dark-blue);
}

.light-element {
  background-color: var(--white);
}
</style>
