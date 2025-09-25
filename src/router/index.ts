import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CountryDetail from '../views/CountryDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/country/:name',
      name: 'country-detail',
      component: CountryDetail,
      props: true
    }
  ],
})

export default router
