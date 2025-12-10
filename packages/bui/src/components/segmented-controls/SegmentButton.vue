<script setup lang="ts">
import { BIcon } from '../icon';
import { type Segment } from './types';

defineProps<{
  active: boolean;
  segment: Segment;
}>();

const emit = defineEmits<{ (e: "click"): void; }>();
</script>

<template>
  <button
    class="cursor-pointer h-6 px-2 flex items-center gap-2 rounded"
    :class="{
      'text-muted bg-secondary hover:bg-tertiary hover:text-tertiary': !active,
      'bg-tertiary shadow-xs text-primary': active
    }"
    @click="emit('click')"
  >
    <BIcon v-if="segment.icon" :name="segment.icon" />
    <p v-if="segment.label" class="text-xs">{{ segment.label }}</p>
  </button>
</template>