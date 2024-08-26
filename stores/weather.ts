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
    async loadWeatherData() {
      await $fetch(`${WEATHER_API_URL}${this.coordinates.latitude}/${this.coordinates.longitude}`)
        .then(response => (this.weather = response))
        .catch(e => console.error('error::', e))
    },
    setCanSearchingByGeo(newStatus: boolean) {
      this.canSearchingByGeo = newStatus
    },
    setCoordinates(coordinates: Coordinates) {
      this.coordinates = coordinates
    },
    async loadWeatherDataByCoordinates(locationItem: LocationItem) {
      const locationStore = useLocationStore()
      const { coordinates } = locationItem

      locationStore.setLocationHistory(locationItem)

      this.setCoordinates(coordinates)
      this.loadWeatherData()
    }
  }
})

export default useWeatherStore
