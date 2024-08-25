<script lang="ts">
  import type { ButtonHTMLAttributes } from 'vue'

  export default defineComponent({
    name: 'Button',
    props: {
      text: {
        required: false,
        type: String
      },
      type: {
        default: 'button',
        required: false,
        type: String as PropType<ButtonHTMLAttributes['type']>
      }
    },
    setup(props) {
      return {
        props
      }
    }
  })
</script>

<template>
  <button class="p-3 border border-gray-400" :type="props.type" @click="$emit('click')">
    {{ props.text }}
  </button>
</template>
