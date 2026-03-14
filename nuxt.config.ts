// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/seo"],
  css: ["~/assets/css/main.css"],

  site: {
    url: 'https://app.nomu.charlesremy.dev',
    name: 'Nomu',
    description: 'Explorez, discutez et réservez des expériences uniques avec la communauté Nomu. Trouvez les bons profils pour toutes vos envies.',
    defaultLocale: 'fr',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/jcd0iqo.css'
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap'
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.ico'
        }
      ],
      meta: [
        { name: 'theme-color', content: '#465E8A' },
        { property: 'og:image', content: 'https://app.nomu.charlesremy.dev/img/Nomu_OG.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://app.nomu.charlesremy.dev/img/Nomu_OG.png' },
      ],
    }
  },

  ogImage: {
    enabled: false,
  },

  sitemap: {
    exclude: [
      '/account',
      '/messages',
      '/messages/**',
      '/reservations',
    ],
  },

  robots: {
    disallow: ['/account', '/messages', '/reservations'],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Nomu',
      url: 'https://app.nomu.charlesremy.dev',
      logo: 'https://app.nomu.charlesremy.dev/img/Nomu_logo.svg',
    },
  },

  runtimeConfig: {
    apiBaseUrl: 'http://localhost:3001',
    public: {
      socketUrl: 'http://localhost:3001',
      apiBase: 'http://localhost:3001',
    }
  }
})
