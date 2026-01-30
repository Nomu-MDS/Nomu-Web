import { ref, type Ref } from 'vue'

function getApiBase(): string {
  const config = useRuntimeConfig()
  const base = (config.public.apiBaseUrl as string) || 'http://localhost:3001'
  return base.replace(/\/$/, '')
}

export function useProfileSearch(query: Ref<string>, selectedInterests: Ref<string[]>) {
  const results = ref<any[]>([])
  const loading = ref(false)
  const hasSearched = ref(false)
  const { getToken } = useAuth()

  async function searchProfiles() {
    loading.value = true
    hasSearched.value = true
    try {
      const params = new URLSearchParams()
      if (query.value) params.append('q', query.value)
      if (selectedInterests.value.length) params.append('filterInterests', selectedInterests.value.join(','))
      params.append('limit', '20')

      const token = getToken()
      const headers: HeadersInit = { 'Content-Type': 'application/json' }
      if (token) headers['Authorization'] = `Bearer ${token}`

      const res = await fetch(`${getApiBase()}/users/search?${params.toString()}`, { headers })
      if (res.ok) {
        const data = await res.json()
        results.value = data.hits || []
      } else {
        results.value = []
      }
    } catch (e) {
      console.error('Search error:', e)
      results.value = []
    } finally {
      loading.value = false
    }
  }

  return { results, loading, hasSearched, searchProfiles }
}