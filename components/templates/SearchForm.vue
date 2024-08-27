<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'
  import Input from '~/components/atoms/Input.vue'

  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()
</script>

<template>
  <div>
    <form class="flex flex-row items-center gap-2" @submit.prevent="locationStore.loadLocations()">
      <div
        v-if="weatherStore.canSearchingByGeo && !weatherStore.weather.lat"
        class="cursor-pointer"
        @click="weatherStore.handleWeatherDataWithCoordinatesHistory()"
      >
        <Icon name="ic:sharp-gps-fixed" size="1.5em" style="color: black" />
      </div>
      <Input
        placeholder="Search"
        type="text"
        @change="e => locationStore.setLocationToSearch(e.target.value)"
      />
      <Button type="submit" text="By City" />
    </form>
    <ul>
      <li v-for="(item, index) in locationStore.locations" :key="index">
        <div
          class="flex flex-row items-center cursor-pointer"
          @click="locationStore.handleLocationSearch(item)"
        >
          <Icon :name="`flagpack:${item.country}`" size="1.4em" style="color: black" />
          <Button :text="item.location" />
        </div>
      </li>
    </ul>
  </div>
</template>
