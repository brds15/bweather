import { defineStore } from 'pinia'
import type { LocationsInfo } from '~/types/location'

const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    locations: [] as LocationsInfo,
    locationToSearch: '' as string
  }),
  actions: {
    async loadLocations() {
      this.locations = await $fetch(`/api/weather/location/${this.locationToSearch}`)
    },
    setLocationToSearch(newValue: string) {
      this.locationToSearch = newValue
    }
  }
})

export default useLocationStore
