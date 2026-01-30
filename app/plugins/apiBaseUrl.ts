export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('apiBaseUrl', useRuntimeConfig().public.apiBaseUrl || 'http://localhost:3001')
})
