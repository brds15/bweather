<script setup lang="ts">
  import DropdownButton from '~/components/atoms/DropdownButton.vue'
  import DropdownItem from '~/components/atoms/DropdownItem.vue'

  const props = defineProps({
    showItems: {
      default: false,
      required: true,
      type: Boolean
    },
    text: {
      required: true,
      type: String
    }
  })
</script>

<template>
  <div class="relative inline-block text-left">
    <div>
      <DropdownButton
        :text="props.text"
        @handleDropdownButtonClick="$emit('handleDropdownButtonClick')"
      />
    </div>
    <div
      v-if="props.showItems"
      aria-labelledby="menu-button"
      aria-orientation="vertical"
      class="absolute right-0 z-20 mt-2 w-auto min-w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      tabindex="-1"
    >
      <DropdownItem>
        <slot />
      </DropdownItem>
    </div>
  </div>
</template>
