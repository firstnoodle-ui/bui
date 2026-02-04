<script setup lang="ts">
import type { Segment } from "./types";
import { BIcon } from "../icon";

defineProps<{
  active: boolean;
  segment: Segment;
  size: "small" | "medium" | "large";
}>();

const emit = defineEmits<{ (e: "click"): void }>();
</script>

<template>
  <button
    class="cursor-pointer flex items-center gap-2 rounded"
    :class="{
      'text-tertiary dark:text-muted bg-secondary hover:bg-tertiary hover:text-tertiary': !active,
      'bg-primary dark:bg-tertiary shadow-xs text-primary': active,
      'h-6 px-2': size === 'small',
      'h-8 px-3': size === 'medium',
      'h-10 px-4': size === 'large',
    }"
    @click="emit('click')"
  >
    <BIcon v-if="segment.icon" :name="segment.icon" />
    <p v-if="segment.label" class="text-xs">
      {{ segment.label }}
    </p>
  </button>
</template>
