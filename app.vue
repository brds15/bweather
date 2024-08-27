<script setup lang="ts">
  const { setLocale } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col bg-sky-600">
    <ul class="bg-gray-200 w-full flex flex-row flex-wrap gap-5 px-4">
      <li>
        <button @click="setLocale('en')">english</button>
      </li>
      <li>
        <button @click="setLocale('fr')">french</button>
      </li>
    </ul>
    <NuxtPage />
  </div>
</template>

<style>
  * {
    font-family: Lato, sans-serif;
  }
</style>
