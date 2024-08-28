export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      cityList: {
        clearHistorical: 'Clear historical',
        historical: 'Historical',
        historicalNotFound: 'Is not there historical',
        saved: 'Saved',
        savedNotFound: 'Is not there saved'
      },
      searchForm: {
        button: 'For City',
        placeholder: 'Search'
      },
      titleOne: 'Weather &',
      titleTwo: 'Forecast',
    },
    pt: {
      welcome: 'Bienvenue'
    }
  }
}))
