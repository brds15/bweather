import { defineStore } from 'pinia'
import type { Locations } from '~/types/location'

const useLocationStore = defineStore({
  id: 'location',
  state: () => ({
    locations: [] as Locations,
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
