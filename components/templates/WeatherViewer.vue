<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'
  import InfoLabel from '~/components/molecules/InfoLabel.vue'
  import { WEATHER_PLACEHOLDER_SRC } from '~/constants'

  const runtimeConfig = useRuntimeConfig()
  const { t } = useI18n()
  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()

  const currentInfo = computed(() => {
    const prefix = 'weather.weatherViewer'

    return [
      {
        text: weatherStore.weatherCurrent?.feelsLike,
        title: t(`${prefix}.feelsLike`)
      },
      {
        text: weatherStore.weatherCurrent?.humidity,
        title: t(`${prefix}.humidity`)
      },
      {
        text: weatherStore.weatherCurrent?.pressure,
        title: t(`${prefix}.pressure`)
      },
      {
        text: weatherStore.weatherCurrent?.visibility,
        title: t(`${prefix}.visibility`)
      },
      {
        text: weatherStore.weatherCurrent?.windSpeed,
        title: t(`${prefix}.windSpeed`)
      },
      {
        text: weatherStore.weatherCurrent?.uvi,
        title: t(`${prefix}.uvi`)
      },
      {
        text: weatherStore.weatherCurrent?.clouds,
        title: t(`${prefix}.clouds`)
      }
    ]
  })

  function handleSave() {
    locationStore.handleSaveLocation({
      latitude: weatherStore.weather.lat,
      longitude: weatherStore.weather.lon
    })
  }
</script>

<template>
  <div class="w-full h-auto p-6">
    <div v-if="weatherStore.weather.lat" class="w-full flex flex-col items-center justify-between">
      <div
        class="w-full flex flex-col-reverse items-center gap-5 mt-14 md:flex-row md:justify-around md:items-start"
      >
        <div class="flex-1">
          <div class="flex items-center justify-center flex-wrap gap-8 md:justify-start">
            <InfoLabel
              v-for="(item, index) in currentInfo"
              :key="index"
              :text="item.text"
              :title="item.title"
            />
          </div>
        </div>
        <div
          class="w-[366px] h-[400px] flex-col justify-between items-center bg-sky-700 overflow-hidden rounded-lg p-8"
        >
          <div class="w-full flex-col justify-between items-center">
            <div class="flex flex-col justify-center items-center leading-3">
              <h4 class="text-3xl text-white">
                {{ locationStore.lastLocationName }}
              </h4>
              <span class="font-light text-gray-300 text-sm capitalize md:text-base">
                {{ weatherStore.weatherDescription }}
              </span>
            </div>
            <div class="w-full relative mt-4 flex flex-col justify-center">
              <span
                class="relative top-[40px] left-[10px] text-5xl font-extrabold text-white text-center z-0 sm:text-7xl sm:top-[26px] sm:left-[13px]"
              >
                {{ weatherStore.weatherCurrent?.temp }}
              </span>
              <NuxtImg
                v-if="weatherStore.weather.lat"
                class="relative z-10 bottom-[48px] sm:bottom-[72px]"
                format="webp"
                preload
                quality="80"
                :placeholder="WEATHER_PLACEHOLDER_SRC"
                :src="`${runtimeConfig.public.imageBase}/${weatherStore.weatherCurrent.weather.icon}@4x.png`"
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
