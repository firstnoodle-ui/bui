<script setup lang="ts">
import { computed } from "vue";
import { BIcon } from "../";

const { value, disabled } = defineProps<{ value: number; disabled: boolean }>();

const icon = computed(() => {
  if (value) {
    return value === 1 ? "check" : "dash";
  }
  return null;
});
</script>

<template>
  <button
    class="group inline-flex items-center justify-center w-6 h-6 rounded-full border focus:outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white"
    :class="{
      'border-action bg-action text-white': !disabled && value,
      'border-strong bg-tertiary text-white cursor-default': disabled && value,
      'border-default bg-secondary hover:bg-secondary cursor-pointer': disabled && !value,
      'border-default bg-primary hover:bg-amber-300 cursor-pointer': !disabled && !value,
    }"
  >
    <BIcon v-if="icon" :name="icon" class="text-white group-hover:text-muted" />
  </button>
</template>
