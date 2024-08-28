<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Button from '~/components/atoms/Button.vue'
  import Input from '~/components/atoms/Input.vue'

  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()

  async function handleCurrentPosition() {
    await weatherStore.handleWeatherDataWithCoordinatesHistory()
    await navigateTo('/weather')
  }
</script>

<template>
  <div>
    <form
      class="flex flex-row items-center gap-2 bg-white rounded-lg mt-14"
      @submit.prevent="locationStore.loadLocations()"
    >
      <div
        v-if="weatherStore.canSearchingByGeo && !weatherStore.weather.lat"
        class="cursor-pointer flex items-center pl-2"
        @click="handleCurrentPosition"
      >
        <Icon name="ic:sharp-gps-fixed" size="1.3em" class="text-sky-900" />
      </div>
      <Input
        :placeholder="$t('searchForm.placeholder')"
        type="text"
        @change="e => locationStore.setLocationToSearch(e.target.value)"
      />
      <Button type="submit" :text="$t('searchForm.button')" />
    </form>
    <ul class="mt-4 bg-white p-4 rounded-lg">
      <li v-for="(item, index) in locationStore.locations" :key="index">
        <div
          class="flex flex-row items-center cursor-pointer my-2 gap-2 overflow-auto rounded-lg p-2 hover:bg-sky-100"
          @click="locationStore.handleLocationSearch(item)"
        >
          <Icon :name="`flagpack:${item.country}`" size="1.4em" style="color: black" />
          <span>{{ item.location }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
