import { defineStore } from 'pinia'
import type { LocationsItems } from '~/types/location'

const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    locations: [] as LocationsItems,
    locationToSearch: '' as string,
    locationsHistory: [] as LocationsItems[],
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
