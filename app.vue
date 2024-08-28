<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import CityList from '~/components/templates/CityList.vue'
  import Dropdown from '~/components/molecules/Dropdown.vue'

  const { setLocale } = useI18n()
  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()
</script>

<template>
  <div class="h-full w-full scroll-smooth flex flex-col min-h-screen bg-gradient-to-b from-neutral-50 to-sky-50">
    <div class="bg-sky-900 w-full flex justify-between items-center p-4">
      <NuxtLink to="/">
        <NuxtImg
          format="webp"
          preload
          quality="60"
          sizes="100vw sm:50vw md:200px"
          src="./logo.webp"
        />
      </NuxtLink>
      <div class="flex items-center gap-5">
        <CityList />
        <Dropdown text="History">
          <div class="w-full" v-for="(item, index) in locationStore.locationsHistory" :key="index">
            <span class="cursor-pointer" @click="weatherStore.handleWeatherDataWithHistory(item)">
              <Icon :name="`flagpack:${item.country}`" size="1.4em" style="color: black" />
              {{ item.location }}
            </span>
          </div>
          <span
            v-if="locationStore.locationsHistory.length > 0"
            @click="locationStore.resetLocationHistory"
            class="cursor-pointer"
          >
            Clear history
          </span>
        </Dropdown>
        <ul class="flex flex-row flex-wrap gap-5">
          <li>
            <button class="text-white" @click="setLocale('en')">english</button>
          </li>
          <li>
            <button class="text-white" @click="setLocale('fr')">french</button>
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
