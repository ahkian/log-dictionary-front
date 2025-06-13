import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import fetchDictionary from '../views/fetchDictionary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: fetchDictionary,
    },
  ],
})

export default router
