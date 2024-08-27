// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  runtimeConfig: {
    apiSecret: process.env.OPEN_WEATHER_API_KEY,
    public: {
      apiBase: process.env.OPEN_WEATHER_API_BASE,
      imageBase: process.env.OPEN_WEATHER_IMAGE_BASE
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image'
  ],
  i18n: {
    vueI18n: './locales/i18n.config.ts'
  },
  fonts: {
    families: [{ name: 'Lato', provider: 'google' }]
  }
})
