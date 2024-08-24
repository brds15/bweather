// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxtjs/tailwindcss',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
  fonts: {
    families: [{ name: 'Lato', provider: 'google' }]
  }
})