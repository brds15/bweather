<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'
  import useLocationStore from '~/stores/location'
  import Dropdown from '~/components/molecules/Dropdown.vue'

  const weatherStore = useWeatherStore()
  const locationStore = useLocationStore()
</script>

<template>
  <div class="flex gap-5 items-center">
    <Dropdown :text="$t('cityList.saved')">
      <span v-if="locationStore.locationsSaved.length === 0">
        {{ $t('cityList.savedNotFound') }}
      </span>
      <div
        v-else
        v-for="(item, index) in locationStore.locationsSaved"
        class="w-full flex items-center justify-around flex-nowrap"
        :key="index"
      >
        <span
          class="w-full cursor-pointer flex items-center gap-2"
          @click="weatherStore.handleListPosition(item)"
        >
          <Icon :name="`flagpack:${item.country}`" size="1.4em" />
          {{ item.location }}
        </span>
        <div class="cursor-pointer" @click="locationStore.removeSaveLocation(item)">
          <Icon name="ic:baseline-delete-outline" size="1.5em" />
        </div>
      </div>
    </Dropdown>
    <Dropdown :text="$t('cityList.historical')">
      <span v-if="locationStore.locationsHistorical.length === 0">
        {{ $t('cityList.historicalNotFound') }}
      </span>
      <div
        v-else
        v-for="(item, index) in locationStore.locationsHistorical"
        class="w-full my-1"
        :key="index"
      >
        <span
          class="w-full cursor-pointer flex items-center gap-2"
          @click="weatherStore.handleListPosition(item)"
        >
          <Icon :name="`flagpack:${item.country}`" size="1.4em" />
          {{ item.location }}
        </span>
      </div>
      <span
        v-if="locationStore.locationsHistorical.length > 1"
        @click="locationStore.resetLocationHistorical"
        class="cursor-pointer mt-3 text-yellow-600"
      >
        {{ $t('cityList.clearHistorical') }}
      </span>
    </Dropdown>
  </div>
</template>
