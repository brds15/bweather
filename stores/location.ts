import { defineStore } from 'pinia'
import type { LocationItem, LocationsItems } from '~/types/location'
import useWeatherStore from '~/stores/weather'

const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    locations: [] as LocationsItems,
    locationToSearch: '' as string,
    locationsHistory: [] as LocationsItems
  }),
  actions: {
    setLocations(newValue: LocationsItems) {
      this.locations = newValue
    },
    async loadLocations() {
      const result = await $fetch(`/api/weather/location/${this.locationToSearch}`)

      this.setLocations(result)
    },
    setLocationToSearch(newValue: string) {
      this.locationToSearch = newValue
    },
    setLocationHistory(locationItem: LocationItem) {
      this.locationsHistory.push(locationItem)
    },
    setResetLocation() {
      this.setLocationToSearch('')
      this.setLocations([])
    },
    handleLocationSearch(locationItem: LocationItem) {
      const weatherStore = useWeatherStore()

      weatherStore.loadWeatherDataByCoordinates(locationItem).finally(() => this.setResetLocation())
    }
  }
})

export default useLocationStore
