<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import SearchForm from '~/components/templates/SearchForm.vue'
  import CityList from '~/components/templates/CityList.vue'
  import WeatherViewer from '~/components/templates/WeatherViewer.vue'

  const weatherStore = useWeatherStore()
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-around p-6">
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <span>
      {{ weatherStore.notifications[0] }}
    </span>
    <hr class="w-full" />
    <SearchForm />
    <hr class="w-full" />
    <CityList />
    <hr class="w-full" />
    <WeatherViewer />
  </div>
</template>
