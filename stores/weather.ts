import { defineStore } from 'pinia'
import useLocationStore from '~/stores/location'
import { navigateToWeather } from '~/utils/navigate'
import type { Coordinates, TransformedWeatherData, WeatherData } from '~/types/weather'
import type { LocationItem } from '~/types/location'

const WEATHER_API_URL = '/api/weather/general/'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    canSearchingByGeo: false as boolean,
    coordinates: { latitude: undefined, longitude: undefined } as Coordinates,
    weather: {} as TransformedWeatherData
  }),
  persist: {
    storage: persistedState.localStorage
  },
  getters: {
    weatherCurrent: state => {
      return state.weather.current
    },
    weatherDescription: state => {
      return state.weather.current?.weather[0]?.description || ''
    }
  },
  actions: {
    setWeather(newWeather: TransformedWeatherData) {
      this.weather = newWeather
    },
    setCanSearchingByGeo(newStatus: boolean) {
      this.canSearchingByGeo = newStatus
    },
    setCoordinates(coordinates: Coordinates) {
      this.coordinates = coordinates
    },
    async loadWeatherData() {
      await $fetch(`${WEATHER_API_URL}${this.coordinates.latitude}/${this.coordinates.longitude}`)
        .then(response => this.setWeather(response))
        .catch(e => console.error('error::', e))
    },
    async handleWeatherDataWithHistorical(locationItem: LocationItem) {
      const locationStore = useLocationStore()

      locationStore.setLocationHistorical(locationItem)

      this.setCoordinates(locationItem.coordinates)

      await this.loadWeatherData()
    },
    async handleWeatherDataWithCoordinatesHistorical() {
      await this.loadWeatherData()

      const locationStore = useLocationStore()
      const locationItem = await locationStore.loadLocationsByCoordinates(this.coordinates)

      if (locationItem) locationStore.saveLocationHistorical(locationItem)
    },
    async handleCurrentPosition() {
      await this.handleWeatherDataWithCoordinatesHistorical()
      await navigateToWeather()
    },
    async handleListPosition(locationItem: LocationItem) {
      await this.handleWeatherDataWithHistorical(locationItem)
      await navigateToWeather()
    }
  }
})

export default useWeatherStore
