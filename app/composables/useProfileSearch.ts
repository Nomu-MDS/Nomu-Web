import type { Ref } from 'vue'

export interface SearchFilters {
  query: Ref<string>
  interests: Ref<string[]>
  cities: Ref<string[]>
}

export function useProfileSearch(filters: SearchFilters) {
  const { get } = useApi()
  const results = ref<any[]>([])
  const loading = ref(false)
  const hasSearched = ref(false)
  const noRelevantResults = ref(false)
  let searchId = 0

  async function searchProfiles() {
    // Ne pas rechercher pour une query d'1 seul caractère
    if (filters.query.value.length === 1) return

    const currentId = ++searchId
    loading.value = true
    hasSearched.value = true
    try {
      const params = new URLSearchParams()
      if (filters.query.value) params.append('q', filters.query.value)
      if (filters.interests.value.length) params.append('filterInterests', filters.interests.value.join(','))
      if (filters.cities.value.length) params.append('filterCity', filters.cities.value.join(','))
      params.append('limit', '50')

      const data = await get<{ hits: any[]; noRelevantResults?: boolean }>(`/users/search?${params.toString()}`)
      // Ignorer si une recherche plus récente a été lancée entre-temps
      if (currentId !== searchId) return
      results.value = data.hits || []
      noRelevantResults.value = data.noRelevantResults ?? false
    } catch (e) {
      if (currentId !== searchId) return
      console.error('Search error:', e)
      results.value = []
      noRelevantResults.value = false
    } finally {
      if (currentId === searchId) loading.value = false
    }
  }

  return { results, loading, hasSearched, noRelevantResults, searchProfiles }
}
