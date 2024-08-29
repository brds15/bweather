<script setup lang="ts">
  const props = defineProps(['text'])
</script>

<template>
  <h2 class="text-3xl font-bold text-yellow-600 mt-8 mb-4">
    {{ props.text }}
  </h2>
</template>
