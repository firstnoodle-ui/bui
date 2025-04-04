<script setup lang="ts">
import { computed } from "vue";
import { BIcon } from "../";

const props = defineProps<{ value: number; disabled: boolean }>();

const icon = computed(() => {
  if (props.value) {
    return props.value === 1 ? "check" : "dash";
  }
  return null;
});

const classes = computed(() => {
  if (!props.disabled && props.value) return "border-action bg-light-blue text-white";
  if (props.disabled && props.value) return "border-default bg-granite-grey-15 text-white cursor-default";
  if (props.disabled && !props.value) return "border-subtle bg-granite-grey-40 cursor-default";
  return "border-default bg-white";
});
</script>

<template>
  <button
    class="inline-flex items-center justify-center w-6 h-6 rounded-full border focus:outline-none focus-visible:border-true-blue active:scale-[0.98]"
    :class="classes"
  >
    <BIcon v-if="icon" :name="icon" class="text-white" :class="{ '-ml-px': value === 1 }" />
  </button>
</template>
