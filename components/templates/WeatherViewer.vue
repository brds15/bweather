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
  <div class="w-full h-auto p-6">
    <div
      v-if="weatherStore.weather.lat"
      class="w-full flex flex-col items-center justify-between"
    >
      <div
        class="w-full flex flex-col items-center gap-5 mt-14 md:flex-row md:justify-around md:items-start"
      >
        <div class="flex-1 border-2"></div>
        <div
          class="w-[366px] h-[400px] flex-col justify-between items-center bg-sky-700 overflow-hidden rounded-lg p-8"
        >
          <div class="w-full flex-col justify-between items-center">
            <div class="flex flex-col justify-center items-center leading-3">
              <h4 class="text-3xl text-white">
                {{ locationStore.lastLocationName }}
              </h4>
              <span class="font-light text-gray-300 text-sm capitalize">
                {{ weatherStore.weatherDescription }}
              </span>
            </div>
            <div class="w-full relative mt-4 flex flex-col justify-center">
              <span
                class="relative top-[40px] left-[10px] text-5xl font-extrabold text-white text-center z-0 sm:text-7xl sm:top-[23px] sm:left-[13px]"
              >
                28°
              </span>
              <NuxtImg
                v-if="weatherStore.weather.lat"
                class="relative z-10 bottom-[48px] sm:bottom-[72px]"
                format="webp"
                preload
                quality="80"
                :placeholder="WEATHER_PLACEHOLDER_SRC"
                :src="`${runtimeConfig.public.imageBase}/${weatherStore.weather.current.weather[0].icon}@4x.png`"
              />
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="handleSave" class="w-full flex justify-center mt-10">
        <div class="w-36">
          <Button
            v-if="weatherStore.weather.lat"
            type="submit"
            :text="$t('weather.weatherViewer.save')"
          />
        </div>
      </form>
      <pre class="bg-black text-white w-full">
      {{ weatherStore.weather }}
    </pre
      >
    </div>
    <div v-else>
      <h4 class="text-3xl text-white mt-14">
        {{ $t('nothingToShow') }}
      </h4>
    </div>
  </div>
</template>
