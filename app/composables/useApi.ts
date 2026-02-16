export function useApi() {
  const { getToken } = useAuth()

  function authHeaders(): HeadersInit {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
  }

  async function get<T>(path: string): Promise<T> {
    return $fetch<T>(`/api${path}`, { headers: authHeaders() })
  }

  async function post<T>(path: string, body: Record<string, any>): Promise<T> {
    return $fetch<T>(`/api${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body,
    })
  }

  async function patch<T>(path: string, body: Record<string, any>): Promise<T> {
    return $fetch<T>(`/api${path}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body,
    })
  }

  return { authHeaders, get, post, patch }
}
