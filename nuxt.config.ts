// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@pinia/nuxt', '@nuxt/test-utils/module'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  fonts: {
    families: [{ name: 'Lato', provider: 'google' }]
  }
})
