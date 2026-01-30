const AUTH_TOKEN_KEY = 'token'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupPayload {
  name: string
  email: string
  password: string
  is_searchable: boolean
  bio?: string
  location?: string
}

export interface AuthResult {
  success: boolean
  error?: string
  token?: string
}

function getApiBase(): string {
  const config = useRuntimeConfig()
  const base = (config.public.apiBaseUrl as string) || 'http://localhost:3001'
  return base.replace(/\/$/, '')
}

export function useAuth() {
  function getToken(): string | null {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      return localStorage.getItem(AUTH_TOKEN_KEY)
    }
    return null
  }

  function setToken(token: string): void {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    }
  }

  function isLoggedIn(): boolean {
    return !!getToken()
  }

  function logout(): void {
    if (import.meta.client && typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  }

  async function login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const res = await fetch(`${getApiBase()}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email.trim(),
          password: credentials.password,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return {
          success: false,
          error: data.message || data.error || 'Email ou mot de passe incorrect.',
        }
      }
      const token = data.token ?? data.access_token ?? data.accessToken
      if (token) {
        setToken(token)
        return { success: true, token }
      }
      return { success: false, error: 'Réponse invalide du serveur.' }
    } catch {
      return {
        success: false,
        error: 'Impossible de joindre le serveur. Vérifie ta connexion.',
      }
    }
  }

  async function signup(payload: SignupPayload): Promise<AuthResult> {
    try {
      const res = await fetch(`${getApiBase()}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name.trim(),
          email: payload.email.trim(),
          password: payload.password,
          is_searchable: payload.is_searchable,
          bio: payload.bio?.trim() || undefined,
          location: payload.location?.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        return {
          success: false,
          error: data.message || data.error || 'Inscription impossible. Réessaie ou contacte-nous.',
        }
      }
      const token = data.token ?? data.access_token ?? data.accessToken
      if (token) {
        setToken(token)
        return { success: true, token }
      }
      return { success: true }
    } catch {
      return {
        success: false,
        error: 'Impossible de joindre le serveur. Vérifie ta connexion.',
      }
    }
  }

  return {
    getToken,
    setToken,
    isLoggedIn,
    logout,
    login,
    signup,
  }
}
