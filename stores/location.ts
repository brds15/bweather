import { defineStore } from 'pinia'
import useWeatherStore from '~/stores/weather'
import type { LocationItem, LocationsItems } from '~/types/location'
import type { Coordinates } from '~/types/weather'

const useLocationStore = defineStore('location', {
  state: () => ({
    locations: [] as LocationsItems,
    locationToSearch: '' as string,
    locationsHistory: [] as LocationsItems,
    locationsSaved: [] as LocationsItems
  }),
  persist: {
    storage: persistedState.localStorage
  },
  actions: {
    setLocations(newValue: LocationsItems) {
      this.locations = newValue
    },
    setLocationToSearch(newValue: string) {
      this.locationToSearch = newValue
    },
    setLocationHistory(locationItem: LocationItem) {
      this.locationsHistory.push(locationItem)
    },
    setLocationSaved(locationItem: LocationItem) {
      this.locationsSaved.push(locationItem)
    },
    handleResetLocation() {
      this.setLocationToSearch('')
      this.setLocations([])
    },
    resetLocationHistory() {
      this.locationsHistory = []
    },
    handleLocationSearch(locationItem: LocationItem) {
      const weatherStore = useWeatherStore()

      weatherStore
        .handleWeatherDataWithHistory(locationItem)
        .finally(() => this.handleResetLocation())
    },
    async loadLocations() {
      $fetch(`/api/weather/location/${this.locationToSearch}`)
        .then(response => this.setLocations(response))
        .catch(e => console.error('error::', e))
    },
    async loadLocationsByCoordinates(coordinates: Coordinates) {
      $fetch(`/api/weather/location/${coordinates.latitude}/${coordinates.longitude}`)
        .then(response => this.setLocationHistory(response[0]))
        .catch(e => console.error('error::', e))
    }
  }
})

export default useLocationStore
