export interface ApiError {
  statusCode: number
  message: string
  data?: any
}

export function useApi() {
  const { getToken, logout, refreshAccessToken } = useAuth()
  const router = useRouter()
  const toast = useToast()

  function authHeaders(token?: string | null): HeadersInit {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const t = token ?? getToken()
    if (t) headers['Authorization'] = `Bearer ${t}`
    return headers
  }

  function handleError(error: any): never {
    const statusCode = error?.response?.status || error?.statusCode || 500
    const message = error?.data?.error || error?.data?.message || error?.message || 'Une erreur est survenue'

    // Session expirée ou non authentifié (already handled by caller for retries)
    if (statusCode === 401) {
      logout()
      toast.add({
        title: 'Session expirée',
        description: 'Votre session a expiré. Veuillez vous reconnecter.',
        color: 'red',
        timeout: 5000
      })
      router.push('/login')
      throw { statusCode, message: 'Session expirée' }
    }

    // Accès refusé
    if (statusCode === 403) {
      toast.add({
        title: 'Accès refusé',
        description: message,
        color: 'red',
        timeout: 5000
      })
      throw { statusCode, message }
    }

    // Erreur serveur (502, 503, 500, etc.)
    if (statusCode >= 500) {
      toast.add({
        title: 'Erreur serveur',
        description: 'Le serveur est temporairement indisponible. Veuillez réessayer dans quelques instants.',
        color: 'red',
        timeout: 5000
      })
      throw { statusCode, message: 'Serveur indisponible' }
    }

    // Ressource non trouvée
    if (statusCode === 404) {
      throw { statusCode, message: 'Ressource non trouvée' }
    }

    // Autres erreurs
    throw { statusCode, message }
  }

  async function withRefresh<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn()
    } catch (error: any) {
      const statusCode = error?.response?.status || error?.statusCode
      if (statusCode === 401) {
        const newToken = await refreshAccessToken()
        if (newToken) {
          try {
            return await fn()
          } catch (retryError) {
            return handleError(retryError)
          }
        }
      }
      return handleError(error)
    }
  }

  async function get<T>(path: string): Promise<T> {
    return withRefresh(() => $fetch<T>(`/api${path}`, { headers: authHeaders() }))
  }

  async function post<T>(path: string, body: Record<string, any>): Promise<T> {
    return withRefresh(() =>
      $fetch<T>(`/api${path}`, {
        method: 'POST',
        headers: authHeaders(),
        body,
      })
    )
  }

  async function patch<T>(path: string, body: Record<string, any>): Promise<T> {
    return withRefresh(() =>
      $fetch<T>(`/api${path}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body,
      })
    )
  }

  return { authHeaders, get, post, patch }
}
