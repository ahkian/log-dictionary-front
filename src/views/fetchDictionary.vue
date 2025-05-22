<template>
  <div class="p-4">
    <button @click="fetchData" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Fetch Data
    </button>

    <div v-if="loading" class="mt-4 text-gray-600">Loading...</div>

    <pre v-if="responseData" class="mt-4 bg-gray-100 p-4 rounded overflow-auto text-sm">
        {{ responseData }}
      </pre
    >

    <div v-if="error" class="mt-4 text-red-600">Error: {{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// TODO add view to router
// Define reactive state variables with types
const responseData = ref<string | null>(null)
const error = ref<string | null>(null)
const loading = ref<boolean>(false)

// Define the fetch function
const fetchData = async (): Promise<void> => {
  loading.value = true
  responseData.value = null
  error.value = null

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if (!res.ok) throw new Error(`HTTP error ${res.status}`)
    const data = await res.json()
    responseData.value = JSON.stringify(data, null, 2)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Optional styling tweaks */
</style>
