import { storeToRefs } from 'pinia'

export function useAuth() {
  const store = useAuthStore()
  const { isLoggedIn } = storeToRefs(store)

  return {
    isLoggedIn,
    getToken: store.getToken,
    setToken: store.setToken,
    logout: store.logout,
    login: store.login,
    signup: store.signup,
  }
}
