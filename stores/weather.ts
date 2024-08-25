import { defineStore } from 'pinia'
import type { Coordinates, WeatherData } from '~/types/weather'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    canSearchingByGeo: false as boolean,
    coordinates: { latitude: undefined, longitude: undefined } as Coordinates,
    weather: {} as WeatherData
  }),
  actions: {
    async loadWeatherData() {
      console.log('coordinates store::', this.coordinates)

      this.weather = await $fetch('/api/weather/general')
    },
    setCanSearchingByGeo(newStatus: boolean) {
      this.canSearchingByGeo = newStatus
    },
    setCoordinates(coordinates: Coordinates) {
      this.coordinates = coordinates
    }
  }
})

export default useWeatherStore
