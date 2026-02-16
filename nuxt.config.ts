// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  
  app: {
    head: {
      link: [
        { 
          rel: 'stylesheet', 
          href: 'https://use.typekit.net/jcd0iqo.css' 
        },
        { // ✅ Déplacé dans link
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap'
        }
      ]
    }
  },
  
  runtimeConfig: {
    apiBaseUrl: 'http://localhost:3001',
    public: {
      socketUrl: 'http://localhost:3001'
    }
  }  
})