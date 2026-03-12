import { storeToRefs } from 'pinia'

export function useAuth() {
  const store = useAuthStore()
  const { isLoggedIn } = storeToRefs(store)

  return {
    isLoggedIn,
    getToken: store.getToken,
    setToken: store.setToken,
    getRefreshToken: store.getRefreshToken,
    setRefreshToken: store.setRefreshToken,
    refreshAccessToken: store.refreshAccessToken,
    logout: store.logout,
    login: store.login,
    signup: store.signup,
  }
}
