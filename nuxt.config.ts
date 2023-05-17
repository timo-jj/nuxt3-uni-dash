// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/main.scss";'
        }
      }
    },
    server: {
      hmr: {
        protocol: 'ws',
        host: '0.0.0.0',
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      'Jost': [400, 500, 600, 700],
    },
  },
})
