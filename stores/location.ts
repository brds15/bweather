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
    async handleLocationSearch(locationItem: LocationItem) {
      if (!locationItem) {
        return
      }

      const weatherStore = useWeatherStore()

      weatherStore
        .handleWeatherDataWithHistory(locationItem)
        .finally(() => this.handleResetLocation())
    },
    saveLocationHistory(locationItem: LocationItem) {
      this.setLocationHistory(locationItem)
    },
    removeSaveLocation(locationItem: LocationItem) {
      const { coordinates } = locationItem

      this.locationsSaved = this.locationsSaved.filter(
        (item: LocationItem) =>
          item.coordinates.latitude !== coordinates.latitude &&
          item.coordinates.longitude !== coordinates.longitude
      )
    },
    async handleSaveLocation(coordinates: Coordinates) {
      const locationItem = await this.loadLocationsByCoordinates(coordinates)

      if (locationItem) this.setLocationSaved(locationItem)
    },
    async loadLocations() {
      $fetch(`/api/weather/location/${this.locationToSearch}`)
        .then(response => this.setLocations(response))
        .catch(e => console.error('error::', e))
    },
    async loadLocationsByCoordinates(coordinates: Coordinates) {
      try {
        const response = await $fetch(
          `/api/weather/location/${coordinates.latitude}/${coordinates.longitude}`
        )

        if (response) {
          return response
        }

        console.error('locations not found')
      } catch (e) {
        console.error('error::', e)
      }
    }
  }
})

export default useLocationStore
