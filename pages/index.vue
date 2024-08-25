<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import getCurrentCoordinates from '~/utils/web-apis/navigator'
  import Button from '~/components/atoms/Button.vue'
  import CityList from '~/components/templates/CityList.vue'
  import SearchForm from '~/components/templates/SearchForm.vue'
  import WeatherViewer from '~/components/templates/WeatherViewer.vue'

  const weatherStore = useWeatherStore()

  onMounted(() => {
    getCurrentCoordinates()
      .then(coordinates => {
        weatherStore.setCanSearchingByGeo(true)
        weatherStore.setCoordinates(coordinates)
      })
      .catch(error => {
        weatherStore.setCanSearchingByGeo(false)
        console.error(error.message)
      })
  })
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-around p-6">
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <hr class="w-full" />
    <SearchForm />
    <Button
      v-if="weatherStore.canSearchingByGeo"
      text="By Coord"
      @click="weatherStore.loadWeatherData()"
    />
    <hr class="w-full" />
    <CityList />
    <hr class="w-full" />
    <pre class="bg-black text-white">
      {{ weatherStore.weather }}
    </pre>
    <WeatherViewer />
  </div>
</template>
