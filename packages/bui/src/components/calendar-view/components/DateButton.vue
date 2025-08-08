<script setup lang="ts">
import type { CalendarGridItem } from "../utils/types";

defineProps<{ date: CalendarGridItem }>();
const emit = defineEmits(["click"]);
</script>

<template>
  <button
    class="flex items-center justify-center w-8 h-8 rounded text-sm font-medium cursor-pointer"
    :class="{
      'bg-secondary text-tertiary rounded-none cursor-not-allowed': date.disabled,
      'text-muted hover:text-secondary hover:bg-tertiary': date.inactive,
      'bg-action text-white': date.selected,
      'text-primary hover:bg-tertiary active:bg-tertiary focus:outline-none focus:shadow-outline focus:bg-blue-200': !date.selected && !date.disabled && !date.inactive,
      'text-xs text-primary': date.current && !date.selected,
      'text-xs font-bold text-white': date.current && date.selected,
    }"
    @click.stop="emit('click', date)"
  >
    {{ date.label }}
  </button>
</template>
