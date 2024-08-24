<script setup lang="ts">
  const { setLocale } = useI18n()
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <ul class="bg-black w-full flex flex-row flex-wrap gap-5">
      <li>
        <button class="text-white" @click="setLocale('en')">en</button>
      </li>
      <li>
        <button class="text-white" @click="setLocale('fr')">fr</button>
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
