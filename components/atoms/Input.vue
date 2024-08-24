<script setup lang="ts">
  const props = defineProps(['placeholder', 'type', 'value', 'placeholder', 'disabled'])
</script>

<template>
  <input
    class="border border-gray-200 rounded-md px-4 py-2"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :type="props.type"
    :value="props.value"
  />
</template>
