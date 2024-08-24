<script setup lang="ts">
  const { setLocale } = useI18n()
</script>

<template>
  <div>
    <ul>
      <li>
        <button @click="setLocale('en')">en</button>
      </li>
      <li>
        <button @click="setLocale('fr')">fr</button>
      </li>
    </ul>
    <span data-testid="title">
      {{ $t('welcome') }}
    </span>
    <Icon
      name="line-md:moon-alt-to-sunny-outline-loop-transition"
      size="5em"
      style="color: black"
    />
  </div>
</template>
