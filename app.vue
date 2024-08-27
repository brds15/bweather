<script setup lang="ts">
  const { setLocale } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col bg-sky-600">
    <div class="bg-gray-200 w-full flex justify-between items-center p-4">
      <NuxtImg
        format="webp"
        preload
        quality="60"
        sizes="100vw sm:50vw md:200px"
        src="./logo.webp"
      />
      <ul class="flex flex-row flex-wrap gap-5">
        <li>
          <button @click="setLocale('en')">english</button>
        </li>
        <li>
          <button @click="setLocale('fr')">french</button>
        </li>
      </ul>
    </div>
    <NuxtPage />
  </div>
</template>

<style>
  * {
    font-family: Lato, sans-serif;
  }
</style>
