export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      titleOne: 'Weather &',
      titleTwo: 'Forecast',
      searchForm: {
        button: 'For City',
        placeholder: 'Search'
      }
    },
    pt: {
      welcome: 'Bienvenue'
    }
  }
}))
