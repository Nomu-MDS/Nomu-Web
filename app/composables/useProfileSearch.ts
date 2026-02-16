import type { Ref } from 'vue'

export interface SearchFilters {
  query: Ref<string>
  interests: Ref<string[]>
  cities: Ref<string[]>
  countries: Ref<string[]>
}

export function useProfileSearch(filters: SearchFilters) {
  const { get } = useApi()
  const results = ref<any[]>([])
  const loading = ref(false)
  const hasSearched = ref(false)

  async function searchProfiles() {
    loading.value = true
    hasSearched.value = true
    try {
      const params = new URLSearchParams()
      if (filters.query.value) params.append('q', filters.query.value)
      if (filters.interests.value.length) params.append('filterInterests', filters.interests.value.join(','))
      if (filters.cities.value.length) params.append('filterCity', filters.cities.value.join(','))
      if (filters.countries.value.length) params.append('filterCountry', filters.countries.value.join(','))
      params.append('limit', '20')

      const data = await get<{ hits: any[] }>(`/users/search?${params.toString()}`)
      results.value = data.hits || []
    } catch (e) {
      console.error('Search error:', e)
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { results, loading, hasSearched, searchProfiles }
}
