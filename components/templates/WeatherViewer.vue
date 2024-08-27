<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig()
</script>

<template>
  <div class="border-2 border-gray-200">
    <h1>WeatherViewer</h1>
    <NuxtImg :src="`${runtimeConfig.public.imageBase}/10d@4x.png`" />
  </div>
</template>
