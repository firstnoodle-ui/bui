<script setup lang="ts">
const { value, disabled = false, indeterminate = false } = defineProps<{ value: boolean; disabled?: boolean; indeterminate?: boolean }>();
</script>

<template>
  <button
    class="flex items-center justify-center w-4 h-4 border rounded focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
    :class="{
      'border-action bg-action hover:bg-action-hover hover:border-action-hover cursor-pointer': (value || indeterminate) && !disabled,
      'bg-primary border-default hover:border-strong hover:bg-secondary cursor-pointer': !value && !indeterminate && !disabled,
      'cursor-default border-default bg-tertiary': disabled,
    }"
  >
    <div v-if="indeterminate" class="w-2 bg-white" style="height: 2px" />
    <svg v-else-if="value" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.41166 0.5L10 2.0417L4.01353 7.5L0 3.57411L1.60557 2.04932L4.02897 4.39988L8.41166 0.5Z" fill="white" />
    </svg>
  </button>
</template>
