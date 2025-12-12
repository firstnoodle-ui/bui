<script setup lang="ts">
import type { Segment } from "./types";
import { BIcon } from "../icon";

defineProps<{
  active: boolean;
  segment: Segment;
}>();

const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button
    class="cursor-pointer h-6 px-2 flex items-center gap-2 rounded"
    :class="{
      'text-tertiary dark:text-muted bg-secondary hover:bg-tertiary hover:text-tertiary': !active,
      'bg-primary dark:bg-tertiary shadow-xs text-primary': active,
    }"
    @click="emit('click')"
  >
    <BIcon v-if="segment.icon" :name="segment.icon" />
    <p v-if="segment.label" class="text-xs">
      {{ segment.label }}
    </p>
  </button>
</template>
