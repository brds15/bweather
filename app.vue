<script setup lang="ts">
  import CityList from '~/components/templates/CityList.vue'
  import { LOCALES, LOGO_SRC, ROUTES } from '~/constants'

  const { setLocale } = useI18n()
</script>

<template>
  <div
    class="h-full w-full scroll-smooth flex flex-col min-h-screen bg-gradient-to-b from-neutral-50 to-sky-50"
  >
    <div class="bg-sky-900 w-full flex flex-wrap justify-between items-center p-4 md:flex-nowrap">
      <NuxtLink :to="ROUTES.HOME">
        <NuxtImg
          format="webp"
          preload
          quality="60"
          sizes="100vw sm:50vw md:200px"
          :src="LOGO_SRC"
        />
      </NuxtLink>
      <div
        class="w-full flex items-center justify-center gap-5 mt-4 md:w-auto md:mt-0 md:justify-end"
      >
        <CityList />
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
