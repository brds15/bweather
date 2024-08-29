<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'
  import InfoLabel from '~/components/molecules/InfoLabel.vue'
  import Title from '~/components/atoms/Title.vue'
  import { WEATHER_PLACEHOLDER_SRC } from '~/constants'
  import { toast } from 'vue3-toastify'

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

  async function handleSave() {
    try {
      await locationStore.handleSaveLocation({
        latitude: weatherStore.weather.lat,
        longitude: weatherStore.weather.lon
      })

      toast.info(t('genericSuccessMessage'))
    } catch {
      toast.error(t('genericErrorMessage'))
    }
  }
</script>

<template>
  <div class="w-full h-auto p-6">
    <div v-if="weatherStore.weather.lat" class="w-full flex flex-col items-center justify-between">
      <div
        class="w-full flex flex-col-reverse items-center gap-5 mt-14 md:flex-row md:justify-around md:items-start"
      >
        <div class="flex flex-1 flex-col">
          <div class="flex items-center justify-center flex-wrap gap-8 md:justify-start">
            <InfoLabel
              v-for="(item, index) in currentInfo"
              :key="index"
              :text="item.text"
              :title="item.title"
            />
          </div>
          <Title :text="$t('weather.weatherViewer.nextHours')" />
          <div class="w-full flex flex-row flex-wrap gap-2">
            <div
              v-for="(item, index) in weatherStore.hourlyWeather"
              class="w-36 flex flex-col bg-sky-700 rounded-lg overflow-hidden"
              :key="index"
            >
              <NuxtImg
                format="webp"
                preload
                quality="80"
                :placeholder="WEATHER_PLACEHOLDER_SRC"
                :src="`${runtimeConfig.public.imageBase}/${item.icon}@2x.png`"
              />
              <div class="flex flex-col items-center justify-between px-8 pb-8">
                <span class="font-light text-gray-300 text-base">
                  {{ item.dt }}
                </span>
                <span class="text-white font-bold text-xl">
                  {{ item.temp }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-[366px] h-[364px] flex-col justify-between items-center bg-sky-700 overflow-hidden rounded-lg p-8"
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
      <Title :text="$t('weather.weatherViewer.nextDays')" />
      <div class="w-full flex flex-col flex-wrap gap-2">
        <div
          v-for="(item, index) in weatherStore.dailyWeather"
          class="w-full flex flex-wrap bg-sky-700 rounded-lg justify-between overflow-hidden py-4 px-8"
          :key="index"
        >
          <div class="flex flex-col justify-center items-start">
            <span class="font-light text-gray-300 text-base">
              {{ $t('weather.weatherViewer.date') }}
            </span>
            <span class="text-white font-bold text-xl">
              {{ item.dt }}
            </span>
          </div>
          <div class="flex flex-col justify-center items-start">
            <NuxtImg
              format="webp"
              preload
              quality="80"
              :placeholder="WEATHER_PLACEHOLDER_SRC"
              :src="`${runtimeConfig.public.imageBase}/${item.icon}@2x.png`"
            />
          </div>
          <div class="flex flex-col justify-center items-start">
            <span class="font-light text-gray-300 text-base">
              {{ $t('weather.weatherViewer.min') }}
            </span>
            <span class="text-white font-bold text-xl">
              {{ item.min }}
            </span>
          </div>
          <div class="flex flex-col justify-center items-start">
            <span class="font-light text-gray-300 text-base">
              {{ $t('weather.weatherViewer.max') }}
            </span>
            <span class="text-white font-bold text-xl">
              {{ item.max }}
            </span>
          </div>
          <div class="flex flex-col justify-center items-start">
            <span class="font-light text-gray-300 text-base">
              {{ $t('weather.weatherViewer.windSpeed') }}
            </span>
            <span class="text-white font-bold text-xl">
              {{ item.windSpeed }}
            </span>
          </div>
        </div>
      </div>
      <form
        v-if="!locationStore.alreadySavedLocation()"
        @submit.prevent="handleSave"
        class="w-full flex justify-center mt-10"
      >
        <div class="w-36">
          <Button
            v-if="weatherStore.weather.lat"
            type="submit"
            :text="$t('weather.weatherViewer.save')"
          />
        </div>
      </form>
    </div>
    <div v-else>
      <h4 class="text-3xl text-center text-yellow-600 mt-14">
        {{ $t('nothingToShow') }}
      </h4>
    </div>
  </div>
</template>
