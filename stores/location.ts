import { defineStore } from 'pinia'
import useWeatherStore from '~/stores/weather'
import { navigateToWeather } from '~/utils/navigate'
import type { LocationItem, LocationsItems } from '~/types/location'
import type { Coordinates } from '~/types/weather'
import { HISTORICAL_LIMIT, SAVE_LIST_LIMIT } from '~/constants'

const useLocationStore = defineStore('location', {
  state: () => ({
    isLoading: false as boolean,
    locations: [] as LocationsItems,
    locationToSearch: '' as string,
    locationsHistorical: [] as LocationsItems,
    locationsSaved: [] as LocationsItems
  }),
  persist: {
    storage: persistedState.localStorage
  },
  getters: {
    lastLocation: state => {
      if (state.locationsHistorical.length > 0) {
        return state.locationsHistorical[state.locationsHistorical.length - 1]
      }

      return undefined
    },
    lastLocationName: state => {
      if (state.locationsHistorical.length > 0) {
        return state.locationsHistorical[state.locationsHistorical.length - 1].name
      }

      return ''
    }
  },
  actions: {
    setIsLoading(newStatus: boolean) {
      this.isLoading = newStatus
    },
    setLocations(newValue: LocationsItems) {
      this.locations = newValue
    },
    setLocationToSearch(newValue: string) {
      this.locationToSearch = newValue
    },
    setLocationHistorical(locationItem: LocationItem) {
      if (this.locationsHistorical.length === HISTORICAL_LIMIT) {
        this.locationsHistorical.shift()
      }

      this.locationsHistorical.push(locationItem)
    },
    setLocationSaved(locationItem: LocationItem) {
      if (this.locationsSaved.length === SAVE_LIST_LIMIT) {
        this.locationsSaved.shift()
      }

      this.locationsSaved.push(locationItem)
    },
    handleResetLocation() {
      this.setLocationToSearch('')
      this.setLocations([])
    },
    resetLocationHistorical() {
      this.locationsHistorical = [this.locationsHistorical[this.locationsHistorical.length - 1]]
    },
    async handleLocationSearch(locationItem: LocationItem) {
      if (!locationItem) {
        return
      }

      const weatherStore = useWeatherStore()

      weatherStore
        .handleWeatherDataWithHistorical(locationItem)
        .finally(() => this.handleResetLocation())
    },
    saveLocationHistorical(locationItem: LocationItem) {
      this.setLocationHistorical(locationItem)
    },
    alreadySavedLocation() {
      const lastLocation = this.lastLocation

      if (lastLocation) {
        const { coordinates } = lastLocation
        const item = this.locationsSaved.find(
          (item: LocationItem) =>
            item.coordinates.latitude === coordinates.latitude &&
            item.coordinates.longitude === coordinates.longitude
        )

        return !!item
      }

      return false
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

      if (locationItem) {
        this.setLocationSaved(locationItem)
        return
      }

      throw 'error'
    },
    async loadLocations() {
      if (this.locationToSearch) {
        this.setIsLoading(true)

        $fetch(`/api/weather/location/${this.locationToSearch}`)
          .then(response => this.setLocations(response))
          .catch(e => console.error('error::', e))
          .finally(() => this.setIsLoading(false))
      }
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
    },
    async handleSelectedPosition(locationItem: LocationItem) {
      await this.handleLocationSearch(locationItem)
      await navigateToWeather()
    }
  }
})

export default useLocationStore
