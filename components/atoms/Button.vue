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
  <button
    @click="$emit('click')"
    class="inline-flex w-full justify-center rounded-lg bg-sky-900 px-4 py-3 text-sm font-bold text-white hover:bg-sky-100 hover:text-sky-900"
    :disabled="props.disabled"
    :type="props.type"
  >
    {{ props.text }}
  </button>
</template>
