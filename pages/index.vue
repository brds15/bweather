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
    <section class="mt-12">
      <h1
        class="text-6xl font-semibold text-sky-900 z-10 md:text-8xl md:leading-9"
        data-testid="title"
      >
        {{ $t('titleOne') }}
      </h1>
      <h2
        class="text-6xl font-semibold text-sky-900 z-0 md:text-8xl md:leading-9"
        data-testid="title2"
      >
        {{ $t('titleTwo') }}
        <Icon class="relative top-2" name="fxemoji:whitesunsmallcloud" size="1em" />
      </h2>
    </section>
    <SearchForm />
  </div>
</template>
