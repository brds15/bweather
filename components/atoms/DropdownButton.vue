<script lang="ts">
  export default defineComponent({
    name: 'DropdownButton',
    props: {
      text: {
        required: true,
        type: String
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
    class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-yellow-600 hover:text-white"
    type="button"
    @click="$emit('handleDropdownButtonClick')"
  >
    {{ props.text }}
  </button>
</template>
