<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import getCurrentCoordinates from '~/utils/web-apis/navigator'
  import SearchForm from '~/components/templates/SearchForm.vue'

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
    <SearchForm />
  </div>
</template>
