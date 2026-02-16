export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const target = (config.apiBaseUrl as string).replace(/\/$/, '')
  const path = event.path.replace(/^\/api/, '')
  return proxyRequest(event, `${target}${path}`)
})
