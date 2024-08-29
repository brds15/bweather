<script setup lang="ts">
  const props = defineProps(['text'])
</script>

<template>
  <span class="text-2xl font-semibold">{{ props.text }}</span>
</template>
