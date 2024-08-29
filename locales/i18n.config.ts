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
        savedNotFound: 'There is not saved'
      },
      searchForm: {
        button: 'For City',
        placeholder: 'Search'
      },
      titleOne: 'Weather &',
      titleTwo: 'Forecast',
      nothingToShow: 'Nothing to show',
      weather: {
        weatherViewer: {
          humidity: 'Humidity',
          clouds: 'Clouds',
          feelsLike: 'Feels like',
          pressure: 'Pressure',
          visibility: 'Visibility',
          windSpeed: 'Wind speed',
          uvi: 'Uvi',
          save: 'Save Location'
        }
      }
    },
    pt: {
      cityList: {
        clearHistorical: 'Limpar histórico',
        historical: 'Histórico',
        historicalNotFound: 'Sem histórico',
        saved: 'Favoritos',
        savedNotFound: 'Sem favoritos'
      },
      searchForm: {
        button: 'Por Cidade',
        placeholder: 'Pesquise'
      },
      titleOne: 'Clima &',
      titleTwo: 'Previsão',
      nothingToShow: 'Nada a mostrar',
      weather: {
        weatherViewer: {
          save: 'Salvar Local'
        }
      }
    }
  }
}))
