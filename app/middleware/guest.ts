export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null
  if (token) {
    return navigateTo('/')
  }
})
