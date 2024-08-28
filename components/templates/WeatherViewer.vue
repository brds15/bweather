<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'
  import { WEATHER_PLACEHOLDER_SRC } from '~/constants'

  const runtimeConfig = useRuntimeConfig()
  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()

  function handleSave() {
    locationStore.handleSaveLocation({
      latitude: weatherStore.weather.lat,
      longitude: weatherStore.weather.lon
    })
  }
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-around p-6">
    <form @submit.prevent="handleSave" class="w-full flex justify-center">
      <div class="w-36">
        <Button
          v-if="weatherStore.weather.lat"
          type="submit"
          :text="$t('weather.weatherViewer.save')"
        />
      </div>
    </form>
    <div class="w-full flex items-center justify-around p-6">
      <div></div>
      <div
        class="flex-col justify-between items-center bg-sky-600 w-[362px] overflow-auto rounded-lg p-10"
      >
        <div class="flex-col justify-between items-center">
          <div class="flex flex-col justify-center items-center leading-3">
            <h4 class="text-3xl text-white">
              {{ locationStore.lastLocationName }}
            </h4>
            <span class="font-light text-gray-300 text-sm capitalize">
              {{ weatherStore.weatherDescription }}
            </span>
          </div>
          <div class="relative z-10 mt-4 flex justify-center">
            <NuxtImg
              v-if="weatherStore.weather.lat"
              class="relative border-4"
              format="webp"
              :placeholder="WEATHER_PLACEHOLDER_SRC"
              preload
              quality="80"
              :src="`${runtimeConfig.public.imageBase}/${weatherStore.weather.current.weather[0].icon}@4x.png`"
            />
          </div>
          <p class="relative bottom-[12.75rem] left-24 text-7xl font-extrabold text-white z-0">
            28°
          </p>
        </div>
      </div>
    </div>
    <pre class="bg-black text-white w-full">
      {{ weatherStore.weather }}
    </pre>
  </div>
</template>
