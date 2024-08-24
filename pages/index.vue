<script setup lang="ts">
  import useWeatherStore from '~/stores/weather'

  const { setLocale } = useI18n()

  const weatherStore = useWeatherStore()
</script>

<template>
  <div>
    <ul>
      <li>
        <button @click="setLocale('en')">en</button>
      </li>
      <li>
        <button @click="setLocale('fr')">fr</button>
      </li>
    </ul>
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <span>
      Aqui
      {{ weatherStore.notifications[0] }}
    </span>
    <Icon
      name="line-md:moon-alt-to-sunny-outline-loop-transition"
      size="5em"
      style="color: black"
    />
  </div>
</template>
