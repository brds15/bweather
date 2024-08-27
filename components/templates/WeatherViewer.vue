<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'

  const runtimeConfig = useRuntimeConfig()
  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()
</script>

<template>
  <div class="border-2 border-gray-200">
    <h1>WeatherViewer</h1>

    <form
      @submit.prevent="
        locationStore.handleSaveLocation({
          latitude: weatherStore.weather.lat,
          longitude: weatherStore.weather.lon
        })
      "
    >
      <Button v-if="weatherStore.weather.lat" type="submit" text="Save" />
    </form>
    <div class="flex flex-col justify-center items-center h-80 bg-sky-600 w-1/2 overflow-auto">
      <div>
        <p class="text-7xl font-extrabold text-white">28°</p>
        <NuxtImg
          v-if="weatherStore.weather.lat"
          :src="`${runtimeConfig.public.imageBase}/${weatherStore.weather.current.weather[0].icon}@4x.png`"
          class="z-10"
          format="webp"
          placeholder="./placeholder.png"
          preload
          quality="80"
        />
      </div>
    </div>

    <pre class="bg-black text-white w-full">
      {{ weatherStore.weather }}
    </pre>
  </div>
</template>
