<script setup lang="ts" generic="T extends OverflowTab">
import type { ComponentPublicInstance } from "vue";
import type { OverflowTab } from "./types";
import { computed } from "vue";
import { useOverflowTabs } from "./useOverflowTabs";

const props = defineProps<{
  tabs: T[];
  selectedTabId: string;
}>();

const emit = defineEmits<{
  (e: "select", tabId: string): void;
}>();

const { containerRef, tabRefs, overflowTriggerRef, visibleIds, overflowIds, onKeydown }
  = useOverflowTabs(
    () => props.tabs,
    () => props.selectedTabId,
  );

const setTabRef = (i: number, el: HTMLElement | null) => {
  if (el) tabRefs.value[i] = el;
};

const visibleTabs = computed(() => props.tabs.filter(t => visibleIds.value.includes(t.id)));

const overflowTabs = computed(() => props.tabs.filter(t => overflowIds.value.includes(t.id)));
</script>

<template>
  <div
    ref="containerRef"
    class="flex w-full overflow-hidden"
    role="tablist"
    aria-orientation="horizontal"
  >
    <template v-for="(tab, i) in visibleTabs" :key="tab.id">
      <slot
        name="tab"
        :tab="tab"
        :selected="tab.id === selectedTabId"
        :attrs="{
          'id': `tab-${tab.id}`,
          'role': 'tab',
          'tabindex': tab.id === selectedTabId ? 0 : -1,
          'aria-selected': tab.id === selectedTabId,
          'aria-controls': `panel-${tab.id}`,
          onKeydown,
          'ref': (el: Element | ComponentPublicInstance | null) =>
            setTabRef(i, el as HTMLElement | null),
        }"
        :select="() => emit('select', tab.id)"
      />
    </template>

    <!-- Overflow trigger -->
    <div v-if="overflowTabs.length" ref="overflowTriggerRef" class="inline-flex">
      <slot
        name="overflow-trigger"
        :count="overflowTabs.length"
        :tabs="overflowTabs"
        :select="(id: string) => emit('select', id)"
      />
    </div>
  </div>
</template>
