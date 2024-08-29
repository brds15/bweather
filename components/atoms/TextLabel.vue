<script setup lang="ts">
  const props = defineProps(['text'])
</script>

<template>
  <span class="text-lg leading-5 text-gray-600 font-light">{{ props.text }}</span>
</template>
