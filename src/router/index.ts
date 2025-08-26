import { createRouter, createWebHistory } from 'vue-router'
import fetchDictionary from '../views/fetchDictionary.vue'
import newEntry from '../views/newEntry.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dictionary',
      name: 'dictionary',
      component: fetchDictionary,
    },
    {
      path: '/newEntry',
      name: 'newEntry',
      component: newEntry,
    },
  ],
})

export default router
