export function useApi() {
  const config = useRuntimeConfig()
  const apiBase = ((config.public.apiBaseUrl as string) || 'http://localhost:3001').replace(/\/$/, '')
  const { getToken } = useAuth()

  function authHeaders(): HeadersInit {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
  }

  async function get<T>(path: string): Promise<T> {
    const res = await fetch(`${apiBase}${path}`, { headers: authHeaders() })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || data.error || `Erreur ${res.status}`)
    }
    return res.json()
  }

  async function post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${apiBase}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || data.error || `Erreur ${res.status}`)
    }
    return res.json()
  }

  async function patch<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${apiBase}${path}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      throw new Error(data.message || data.error || `Erreur ${res.status}`)
    }
    return res.json()
  }

  return { apiBase, authHeaders, get, post, patch }
}
