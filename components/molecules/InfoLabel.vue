<script setup lang="ts">
  import TextLabel from '~/components/atoms/TextLabel.vue'
  import TextTitleLabel from '~/components/atoms/TextTitleLabel.vue'

  const props = defineProps(['text', 'title'])
</script>

<template>
  <div class="flex flex-col text-gray-800">
    <TextTitleLabel :text="props.title" />
    <TextLabel :text="props.text" />
  </div>
</template>
