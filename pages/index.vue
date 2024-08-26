<script setup lang="ts">
  import useLocationStore from '~/stores/location'
  import useWeatherStore from '~/stores/weather'
  import getCurrentCoordinates from '~/utils/web-apis/navigator'
  import Button from '~/components/atoms/Button.vue'
  import CityList from '~/components/templates/CityList.vue'
  import SearchForm from '~/components/templates/SearchForm.vue'
  import WeatherViewer from '~/components/templates/WeatherViewer.vue'
  import Input from '~/components/atoms/Input.vue'

  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()

  onMounted(() => {
    getCurrentCoordinates()
      .then(coordinates => {
        weatherStore.setCanSearchingByGeo(true)
        weatherStore.setCoordinates(coordinates)
      })
      .catch(error => {
        weatherStore.setCanSearchingByGeo(false)
        console.error(error.message)
      })
  })
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-around p-6">
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <hr class="w-full" />
    <SearchForm />
    <form class="flex flex-row gap-2" @submit.prevent="locationStore.loadLocations()">
      <Button
        v-if="weatherStore.canSearchingByGeo"
        text="By Current Coord"
        @click="weatherStore.loadWeatherData()"
      />
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
          @click="weatherStore.loadWeatherDataByCoordinates(item.cordinates)"
        >
          <Icon :name="`flagpack:${item.country}`" size="1.4em" style="color: black" />
          <Button :text="item.location" />
        </div>
      </li>
    </ul>
    <pre class="bg-black text-white">
      {{ locationStore.locations }}
    </pre>
    <hr class="w-full" />
    <CityList />
    <hr class="w-full" />
    <pre class="bg-black text-white h-80 overflow-auto">
      {{ weatherStore.weather }}
    </pre>
    <WeatherViewer />
  </div>
</template>
