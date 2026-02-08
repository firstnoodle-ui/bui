<script setup lang="ts">
import type { OverflowTab } from "./useOverflowTabs";
import { computed } from "vue";
import { useOverflowTabs } from "./useOverflowTabs";

type Props<T extends OverflowTab> = {
  tabs: T[];
  modelValue: string;
};

const props = defineProps<Props<any>>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const {
  containerRef,
  tabRefs,
  overflowTriggerRef,
  visibleIds,
  overflowIds,
  onKeydown,
} = useOverflowTabs(
  () => props.tabs,
  () => props.modelValue,
);

const visibleTabs = computed(() =>
  props.tabs.filter(t => visibleIds.value.includes(t.id)),
);

const overflowTabs = computed(() =>
  props.tabs.filter(t => overflowIds.value.includes(t.id)),
);
</script>

<template>
  <div
    ref="containerRef"
    class="flex w-full overflow-hidden border border-blue-500"
    role="tablist"
    aria-orientation="horizontal"
  >
    <template
      v-for="(tab, i) in visibleTabs"
      :key="tab.id"
    >
      <slot
        name="tab"
        :tab="tab"
        :selected="tab.id === modelValue"
        :attrs="{
          'id': `tab-${tab.id}`,
          'role': 'tab',
          'tabindex': tab.id === modelValue ? 0 : -1,
          'aria-selected': tab.id === modelValue,
          'aria-controls': `panel-${tab.id}`,
          onKeydown,
          'ref': (el: HTMLElement) => (tabRefs[i] = el),
        }"
        :select="() => emit('update:modelValue', tab.id)"
      />
    </template>

    <!-- Overflow trigger -->
    <div v-if="overflowTabs.length" ref="overflowTriggerRef">
      <slot
        name="overflow-trigger"
        :count="overflowTabs.length"
      />

      <slot
        name="overflow-menu"
        :tabs="overflowTabs"
        :select="(id: string) => emit('update:modelValue', id)"
      />
    </div>
  </div>
</template>
