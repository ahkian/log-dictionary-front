<template>
  <div>
    <h2>Log Dictionary</h2>
    <div class="filters">
      <input type="text" v-model="filterText" placeholder="Filter logs" class="filter-input" />
      <select v-model="selectedSystemArea" class="system-area-dropdown">
        <option value="">All system areas</option>
        <option v-for="area in systemAreas" :key="area" :value="area">
          {{ area }}
        </option>
      </select>
    </div>
    <table v-if="entries.length">
      <thead>
        <tr>
          <th>Pattern</th>
          <th>Category</th>
          <th>System Area</th>
          <th>Log Type</th>
          <th class="explanation">Explanation</th>
          <th>Troubleshooting Link</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredEntries" :key="entry._id">
          <td>{{ entry.pattern }}</td>
          <td>{{ entry.category }}</td>
          <td>{{ entry.systemArea }}</td>
          <td>{{ entry.logType }}</td>
          <td class="explanation">{{ entry.explanation }}</td>
          <td>
            <a :href="entry.troubleshootingLink" target="_blank">Link</a>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>No data available.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Entry {
  _id: string
  pattern: string
  category: string
  systemArea: string
  logType: string
  explanation: string
  troubleshootingLink: string
}

export default defineComponent({
  name: 'FetchDictionary',
  setup() {
    const entries = ref<Entry[]>([])
    const filterText = ref('')
    const selectedSystemArea = ref('')

    onMounted(() => {
      axios
        .get<Entry[]>('http://localhost:3000/api/getAll')
        .then((response) => {
          entries.value = response.data
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    })

    const systemAreas = computed(() => {
      const unique = new Set(entries.value.map((e) => e.systemArea))
      return Array.from(unique).sort()
    })

    const filteredEntries = computed(() => {
      const term = filterText.value.toLowerCase()

      return entries.value.filter((entry) => {
        const matchesText =
          !term ||
          Object.values(entry).some(
            (val) => typeof val === 'string' && val.toLowerCase().includes(term),
          )
        const matchesSystemArea =
          !selectedSystemArea.value || entry.systemArea === selectedSystemArea.value

        return matchesText && matchesSystemArea
      })
    })

    return {
      entries,
      filterText,
      filteredEntries,
      systemAreas,
      selectedSystemArea,
    }
  },
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: sans-serif;
  font-size: 14px;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 12px 16px;
  vertical-align: top;
}

th {
  background-color: #f4f4f4;
  color: black;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #fafafa;
  color: black;
}

tr:hover {
  background-color: green;
  color: yellow;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.explanation {
  width: 50%;
}
</style>
