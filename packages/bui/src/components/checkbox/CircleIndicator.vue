<script setup lang="ts">
import { computed } from "vue";
import { BIcon } from "../";

const { value, disabled = false, indeterminate = false } = defineProps<{ value: boolean; indeterminate?: boolean; disabled?: boolean }>();

const icon = computed(() => {
  if (value) return "check";
  if (indeterminate) return "dash"
  return null;
});
</script>

<template>
  <button
    class="group inline-flex items-center justify-center w-6 h-6 rounded-full border focus:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
    :class="{
      'border-default bg-primary hover:bg-secondary hover:border-strong cursor-pointer': !disabled && !value,
      'border-action bg-action text-white hover:bg-action-hover hover:border-action-hover cursor-pointer': !disabled && value,
      'border-default bg-tertiary text-white cursor-default': disabled && value,
      'border-default bg-secondary hover:bg-secondary': disabled && !value,
    }"
  >
    <BIcon v-if="icon" :name="icon" class="text-white" />
  </button>
</template>
