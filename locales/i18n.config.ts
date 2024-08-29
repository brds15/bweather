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
          clouds: 'Clouds',
          feelsLike: 'Feels like',
          humidity: 'Humidity',
          nextHours: 'Next Hours',
          pressure: 'Pressure',
          save: 'Save Location',
          uvi: 'Uvi',
          visibility: 'Visibility',
          windSpeed: 'Wind speed',
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
