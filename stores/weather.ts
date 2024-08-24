import { defineStore } from 'pinia'

const useWeatherStore = defineStore({
  id: 'weather',
  state: () => ({
    notifications: ['firsts'] as string[]
  })
})

export default useWeatherStore
