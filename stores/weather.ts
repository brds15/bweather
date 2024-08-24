import { defineStore } from 'pinia'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    notifications: ['first'] as string[]
  })
})

export default useWeatherStore
