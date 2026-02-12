<script setup lang="ts">
import type { Tab } from "./types";
import { BIcon } from "../../..";

const { selected, tab } = defineProps<{
  selected: boolean;
  tab: Tab;
}>();
const emit = defineEmits<{ (e: "select", tab: Tab): void }>();
</script>

<template>
  <div class="group -mb-px flex flex-col justify-center gap-1">
    <button
      class="flex items-center gap-1 h-6 px-2 rounded-lg cursor-pointer"
      :class="{
        'text-action border-action': selected,
        'text-tertiary border-default hover:bg-tertiary': selected,
      }"
      @click="emit('select', tab)"
    >
      <BIcon :name="tab.icon" />
      <span class="relative text-xs font-medium truncate">{{ tab.label }}</span>
    </button>
    <div class="flex w-full h-px px-2">
      <div
        class="flex w-full h-full border-b"
        :class="{
          'border-action': selected,
          'border-default': !selected,
        }"
      />
    </div>
  </div>
</template>
