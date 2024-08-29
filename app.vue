<script setup lang="ts">
  import CityList from '~/components/templates/CityList.vue'
  import { LOCALES, LOGO_SRC, ROUTES } from '~/constants'
  import type { List } from '~/types/city-list'

  useHead({
    title: 'BWeather | Anytime Weather Status',
    meta: [
      { name: 'Forecast', content: 'Forecast now' },
      { name: 'Weather', content: 'Weather now' }
    ]
  })

  const showSavedItems = ref(false)
  const showHistoricalItems = ref(false)
  const { setLocale } = useI18n()

  const handleClose = () => {
    showSavedItems.value = false
    showHistoricalItems.value = false
  }

  const handleShowList = (list: List) => {
    if (list === 'historical') showHistoricalItems.value = !showHistoricalItems.value
    if (list === 'saved') showSavedItems.value = !showSavedItems.value
  }
</script>

<template>
  <div
    class="h-full w-full scroll-smooth flex flex-col min-h-screen bg-gradient-to-b from-neutral-50 to-sky-50 overflow-hidden"
  >
    <div
      class="bg-sky-900 w-full flex flex-wrap justify-between items-center p-4 px-6 md:flex-nowrap"
    >
      <NuxtLink :to="ROUTES.HOME">
        <NuxtImg preload quality="50" sizes="100vw sm:50vw md:200px" :src="LOGO_SRC" />
      </NuxtLink>
      <div
        class="w-full flex flex-row-reverse items-center justify-center gap-5 mt-4 md:w-auto md:mt-0 md:justify-end md:flex-row"
      >
        <CityList
          v-click-outside="handleClose"
          :show-historical-items="showHistoricalItems"
          :show-saved-items="showSavedItems"
          @handleDropdownButtonClick="handleShowList"
        />
        <ul class="flex flex-row flex-wrap gap-5">
          <li v-for="(locale, index) in LOCALES" :key="index">
            <button class="text-white" @click="setLocale(locale.abbreviation)">
              {{ locale.language }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<style>
  * {
    font-family: Lato, sans-serif;
  }
</style>
