import { defineStore } from 'pinia'
import type { LocationItem, LocationsItems } from '~/types/location'
import useWeatherStore from '~/stores/weather'
import type { Coordinates } from '~/types/weather'

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

      weatherStore.handleWeatherDataWithHistory(locationItem).finally(() => this.setResetLocation())
    },
    async loadLocations() {
      $fetch(`/api/weather/location/${this.locationToSearch}`)
        .then(response => this.setLocations(response))
        .catch(e => console.error('error::', e))
    },
    async loadLocationsByCoordinates(coordinates: Coordinates) {
      console.log('aquii')
      $fetch(`/api/weather/location/${coordinates.latitude}/${coordinates.longitude}`)
        .then(response => this.setLocationHistory(response[0]))
        .catch(e => console.error('error::', e))
    }
  }
})

export default useLocationStore
