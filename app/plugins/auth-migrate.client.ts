export default defineNuxtPlugin(() => {
  const auth = useAuthStore()
  const oldToken = localStorage.getItem('token')

  if (oldToken && !auth.getToken()) {
    auth.setToken(oldToken)
    localStorage.removeItem('token')
  }
})
