<script setup lang="ts" generic="T extends TPopSelectOption">
import type { TPopSelectOption, TPopSelectResultFilter } from "../types";
import { BPill } from "../";

withDefaults(defineProps<{
  selected: TPopSelectResultFilter<T> | null;
  showCounts?: boolean;
  filters: TPopSelectResultFilter<T>[];
}>(), {
  showCounts: false,
});

const emit = defineEmits(["change"]);
</script>

<template>
  <section class="flex items-center px-2 pb-2 space-x-2">
    <BPill
      v-for="filter in filters"
      :key="filter.name"
      :selected="Boolean(selected && selected.name === filter.name)"
      stop-propagation
      @click="emit('change', filter)"
    >
      <span class="flex items-center space-x-1">
        <span>{{ filter.name }}</span>
        <span v-if="showCounts && filter.count" class="text-xs opacity-75">{{ `(${filter.count})` }}</span>
      </span>
    </BPill>
  </section>
</template>
