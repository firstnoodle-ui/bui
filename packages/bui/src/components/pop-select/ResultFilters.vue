<script setup lang="ts" generic="T extends TPopSelectOption">
import type { TPopSelectOption, TPopSelectResultFilter } from "../types";
import { BFilterChip } from "../";

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
    <BFilterChip
      v-for="filter in filters"
      :key="filter.name"
      :active="Boolean(selected && selected.name === filter.name)"
      :count="filter.count"
      :label="filter.name"
      stop-propagation
      @click="emit('change', filter)"
    />
  </section>
</template>
