import { defineStore } from 'pinia'
import type { Coordinates, WeatherData } from '~/types/weather'
import useLocationStore from '~/stores/location'
import type { LocationItem } from '~/types/location'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    canSearchingByGeo: false as boolean,
    coordinates: { latitude: undefined, longitude: undefined } as Coordinates,
    weather: {} as WeatherData
  }),
  actions: {
    async loadWeatherData() {
      this.weather = await $fetch(
        `/api/weather/general/${this.coordinates.latitude}/${this.coordinates.longitude}`
      )
    },
    setCanSearchingByGeo(newStatus: boolean) {
      this.canSearchingByGeo = newStatus
    },
    setCoordinates(coordinates: Coordinates) {
      this.coordinates = coordinates
    },
    async loadWeatherDataByCoordinates(locationItem: LocationItem) {
      const locationStore = useLocationStore()
      const { cordinates } = locationItem

      locationStore.setLocationHistory(locationItem)

      this.setCoordinates(cordinates)
      this.loadWeatherData()
    }
  }
})

export default useWeatherStore
