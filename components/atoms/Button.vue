<script lang="ts">
  import type { ButtonHTMLAttributes, PropType } from 'vue'

  export default defineComponent({
    name: 'Button',
    props: {
      disabled: {
        default: false,
        required: false,
        type: Boolean
      },
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
  <button class="p-3 border border-gray-400 disabled:bg-red-800" :disabled="props.disabled" :type="props.type" @click="$emit('click')">
    {{ props.text }}
  </button>
</template>
