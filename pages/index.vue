<script setup lang="ts">
  import debounce from '~/utils/debounce'
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

  const debouncedSetLocation = debounce((value: string) => {
    locationStore.setLocationToSearch(value)
  }, 200)
</script>

<template>
  <div class="w-full h-auto flex flex-col items-center justify-around p-6">
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <hr class="w-full" />
    <SearchForm />
    <div class="flex flex-row gap-2">
      <Input type="text" placeholder="Search" @change="e => debouncedSetLocation(e.target.value)" />
      <Button
        v-if="locationStore.locationToSearch"
        text="By City"
        @click="locationStore.loadLocations()"
      />
    </div>
    <ul>
      <li v-for="item in locationStore.locations">
        <Button
          :text="item.location"
          @click="weatherStore.loadWeatherDataByCoordinates(item.cordinates)"
        />
      </li>
    </ul>
    <pre class="bg-black text-white">
      {{ locationStore.locations }}
    </pre>

    <Button
      v-if="weatherStore.canSearchingByGeo"
      text="By Coord"
      @click="weatherStore.loadWeatherData()"
    />
    <hr class="w-full" />
    <CityList />
    <hr class="w-full" />
    <pre class="bg-black text-white">
      {{ weatherStore.weather }}
    </pre>
    <WeatherViewer />
  </div>
</template>
