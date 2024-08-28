import { defineStore } from 'pinia'
import type { Coordinates, WeatherData } from '~/types/weather'
import useLocationStore from '~/stores/location'
import type { LocationItem } from '~/types/location'

const WEATHER_API_URL = '/api/weather/general/'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    canSearchingByGeo: false as boolean,
    coordinates: { latitude: undefined, longitude: undefined } as Coordinates,
    weather: {} as WeatherData
  }),
  actions: {
    setWeather(newWeather: WeatherData) {
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

      this.loadWeatherData()
    },
    async handleWeatherDataWithCoordinatesHistorical() {
      this.loadWeatherData()

      const locationStore = useLocationStore()
      const locationItem = await locationStore.loadLocationsByCoordinates(this.coordinates)


      if (locationItem) locationStore.saveLocationHistorical(locationItem)
    }
  }
})

export default useWeatherStore
