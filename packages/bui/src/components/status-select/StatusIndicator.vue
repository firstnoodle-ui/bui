<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<script setup lang="ts">
import type { TStatusSelectStatus } from "../types";
import { computed } from "vue";
import { BIcon, BLoadSpinner } from "../";

const props = withDefaults(
  defineProps<{
    button?: boolean;
    loading?: boolean;
    softFocus?: boolean;
    status?: TStatusSelectStatus | null;
  }>(),
  {
    button: true,
    loading: false,
    softFocus: false,
    status: null,
  },
);

// should be a 'disabled' prop instead of 'button'
const tag = computed(() => (props.button ? "button" : "div"));

const classes = computed(() => {
  const result = [];

  const loadingClasses = "border-default bg-granite-grey-15";

  switch (props.status) {
    case null:
      if (props.loading) {
        result.push(loadingClasses);
      }
      else if (props.button) {
        result.push("border-default");
        props.softFocus ? result.push("bg-sand-grey-15") : result.push("bg-white");
      }

      break;
    case "Ok":
      props.loading ? result.push(loadingClasses) : result.push("border-forest-green-darker bg-forest-green");
      break;
    case "Not Ok":
      props.loading ? result.push(loadingClasses) : result.push("border-lava-red-darker bg-lava-red");
      break;
    case "Not Applicable":
      props.loading ? result.push(loadingClasses) : result.push("border-granite-grey-darker bg-granite-grey");
      break;
    default:
  }

  if (props.button) result.push("focus:outline-hidden focus-visible:ring-3 active:scale-[0.98]");

  return result;
});

const icon = computed(() => {
  switch (props.status) {
    case null:
      return null;
    case "Ok":
      return "check";
    case "Not Ok":
      return "close";
    case "Not Applicable":
      return "dash";
  }
  return null;
});
</script>

<template>
  <component :is="tag" class="inline-flex items-center justify-center w-6 h-6 rounded-full border" :class="classes">
    <BLoadSpinner v-if="loading" class="w-4 h-4 text-white" />
    <BIcon v-else-if="icon" :name="icon" class="text-white" />
  </component>
</template>
