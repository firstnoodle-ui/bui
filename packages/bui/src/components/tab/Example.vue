<script setup lang="ts">
import type { OverflowTab } from "./useOverflowTabs";
import { ref } from "vue";
import OverflowTabs from "./OverflowTabs.vue";

const tabs: ({ label: string } & OverflowTab)[] = [
  { id: "Home", label: "Home" },
  { id: "Test", label: "Test" },
  { id: "Groceries", label: "Groceries" },
];

const selectedTab = ref<OverflowTab>(tabs[0]);
</script>

<template>
  <OverflowTabs
    v-model="selectedTab.id"
    :tabs="tabs"
  >
    <template #tab="{ tab, selected, attrs, select }">
      <button
        v-bind="attrs"
        class="px-4 py-2 border-b-2 whitespace-nowrap"
        :class="selected
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500'"
        @click="select"
      >
        {{ tab.label }}
      </button>
    </template>

    <template #overflow-trigger="{ count }">
      <button class="px-4 py-2 border-b-2">
        More ({{ count }}) ▾
      </button>
    </template>

    <template #overflow-menu="{ tabs, select }">
      <div class="absolute bg-white border shadow">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="block px-4 py-2 hover:bg-gray-100"
          @click="select(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>
    </template>
  </OverflowTabs>
</template>
