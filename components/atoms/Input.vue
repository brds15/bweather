<script setup lang="ts">
  const props = defineProps(['placeholder', 'type', 'value', 'placeholder', 'disabled'])
</script>

<template>
  <input
    class="border border-white rounded-lg px-2 py-2"
    :disabled="props.disabled"
    :placeholder="props.placeholder"
    :type="props.type"
    :value="props.value"
  />
</template>
