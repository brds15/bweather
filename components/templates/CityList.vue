<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Dropdown from '~/components/molecules/Dropdown.vue'

  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()
</script>

<template>
  <Dropdown text="Favorites">
    <div
      class="w-full flex items-center justify-around flex-nowrap"
      v-for="(item, index) in locationStore.locationsSaved"
      :key="index"
    >
      <span class="cursor-pointer" @click="weatherStore.handleWeatherDataWithHistory(item)">
        <Icon :name="`flagpack:${item.country}`" size="1.4em" style="color: black" />
        {{ item.location }}
      </span>
      <div class="cursor-pointer" @click="locationStore.removeSaveLocation(item)">
        <Icon name="ic:baseline-delete-outline" size="1.5em" style="color: black" />
      </div>
    </div>
  </Dropdown>
</template>
