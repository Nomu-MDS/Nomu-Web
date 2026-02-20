export default defineNuxtPlugin((nuxtApp) => {
  const { logout, isLoggedIn } = useAuth()
  const router = useRouter()
  const toast = useToast()

  // Intercepter les erreurs de $fetch globalement
  nuxtApp.hook('app:error', (error: any) => {
    console.error('App error:', error)
  })

  // Intercepter les erreurs $fetch via un wrapper
  const originalFetch = globalThis.$fetch
  globalThis.$fetch = new Proxy(originalFetch, {
    apply(target, thisArg, argumentsList) {
      return Reflect.apply(target, thisArg, argumentsList).catch((error: any) => {
        const statusCode = error?.response?.status || error?.statusCode || 500

        // Session expirée ou non authentifié (uniquement si l'utilisateur était connecté)
        if (statusCode === 401 && isLoggedIn.value) {
          logout()
          toast.add({
            title: 'Session expirée',
            description: 'Votre session a expiré. Veuillez vous reconnecter.',
            color: 'red',
            timeout: 5000
          })
          router.push('/login')
        }

        // Erreur serveur (502, 503, 500, etc.)
        if (statusCode >= 500) {
          console.error(`Server error ${statusCode}:`, error)
          toast.add({
            title: 'Erreur serveur',
            description: 'Le serveur est temporairement indisponible. Veuillez réessayer dans quelques instants.',
            color: 'red',
            timeout: 5000
          })
        }

        // Re-throw l'erreur pour que les composants puissent aussi la gérer
        throw error
      })
    }
  })
})
