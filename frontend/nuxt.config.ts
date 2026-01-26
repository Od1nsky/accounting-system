export default defineNuxtConfig({
  compatibilityDate: '2026-01-16',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'vuetify-nuxt-module',
  ],
  vuetify: {
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
    },
  },
  css: ['~/assets/styles/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: ''
        }
      }
    }
  },
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000/api',
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  devServer: {
    port: 4001
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000'
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
