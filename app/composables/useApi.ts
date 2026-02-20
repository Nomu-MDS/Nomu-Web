export interface ApiError {
  statusCode: number
  message: string
  data?: any
}

export function useApi() {
  const { getToken, logout } = useAuth()
  const router = useRouter()
  const toast = useToast()

  function authHeaders(): HeadersInit {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const token = getToken()
    if (token) headers['Authorization'] = `Bearer ${token}`
    return headers
  }

  function handleError(error: any): never {
    const statusCode = error?.response?.status || error?.statusCode || 500
    const message = error?.data?.error || error?.data?.message || error?.message || 'Une erreur est survenue'

    // Session expirée ou non authentifié
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

  async function get<T>(path: string): Promise<T> {
    try {
      return await $fetch<T>(`/api${path}`, { headers: authHeaders() })
    } catch (error) {
      return handleError(error)
    }
  }

  async function post<T>(path: string, body: Record<string, any>): Promise<T> {
    try {
      return await $fetch<T>(`/api${path}`, {
        method: 'POST',
        headers: authHeaders(),
        body,
      })
    } catch (error) {
      return handleError(error)
    }
  }

  async function patch<T>(path: string, body: Record<string, any>): Promise<T> {
    try {
      return await $fetch<T>(`/api${path}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body,
      })
    } catch (error) {
      return handleError(error)
    }
  }

  return { authHeaders, get, post, patch }
}
