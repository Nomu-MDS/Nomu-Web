import { defineStore } from 'pinia'

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupPayload {
  first_name: string
  last_name: string
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

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('auth-token', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    path: '/',
  })

  const isLoggedIn = computed(() => !!tokenCookie.value)

  function getToken(): string | null {
    return tokenCookie.value ?? null
  }

  function setToken(value: string): void {
    tokenCookie.value = value
  }

  function logout(): void {
    tokenCookie.value = null
  }

  async function login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const data = await $fetch<Record<string, any>>('/api/auth/login', {
        method: 'POST',
        body: {
          email: credentials.email.trim(),
          password: credentials.password,
        },
      })
      const t = data.token ?? data.access_token ?? data.accessToken
      if (t) {
        setToken(t)
        return { success: true, token: t }
      }
      return { success: false, error: 'Réponse invalide du serveur.' }
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.error || 'Email ou mot de passe incorrect.'
      return { success: false, error: msg }
    }
  }

  async function signup(payload: SignupPayload): Promise<AuthResult> {
    try {
      const firstName = payload.first_name.trim()
      const lastName = payload.last_name.trim()
      const data = await $fetch<Record<string, any>>('/api/auth/signup', {
        method: 'POST',
        body: {
          name: [firstName, lastName].filter(Boolean).join(' '),
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          email: payload.email.trim(),
          password: payload.password,
          is_searchable: payload.is_searchable,
          bio: payload.bio?.trim() || undefined,
          location: payload.location?.trim() || undefined,
        },
      })
      const t = data.token ?? data.access_token ?? data.accessToken
      if (t) {
        setToken(t)
        return { success: true, token: t }
      }
      return { success: true }
    } catch (err: any) {
      const msg = err?.data?.message || err?.data?.error || 'Inscription impossible. Réessaie ou contacte-nous.'
      return { success: false, error: msg }
    }
  }

  return {
    isLoggedIn,
    getToken,
    setToken,
    logout,
    login,
    signup,
  }
})
