<script setup lang="ts">
defineProps<{ value: number; disabled: boolean }>();
</script>

<template>
  <button
    class="flex items-center justify-center w-4 h-4 border rounded focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
    :class="{
      'border-action bg-action': value && !disabled,
      'bg-primary border-default': !value && !disabled,
      'border-default bg-secondary': disabled && value,
      'border-subtle bg-tertiary': disabled && !value,
      'cursor-default': disabled,
      'hover:border-action focus:border-actionLightActive focus:outline-hidden': !disabled,
    }"
  >
    <svg v-if="value === 1" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.41166 0.5L10 2.0417L4.01353 7.5L0 3.57411L1.60557 2.04932L4.02897 4.39988L8.41166 0.5Z" fill="white" />
    </svg>
    <div v-if="value === 2" class="w-2 bg-primary" style="height: 2px" />
  </button>
</template>
