<script lang="ts">
  export default defineComponent({
    name: 'DropdownButton',
    props: {
      text: {
        required: false,
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
  <div class="py-1" role="none">
    <span
      class="flex flex-col justify-around items-center px-4 py-2 text-sm text-gray-700"
      role="menuitem"
      tabindex="-1"
    >
      <slot />
    </span>
  </div>
</template>
