<script setup lang="ts">
import type { TIcon } from "../types";
import { BIcon } from "../";

defineProps<{
  icon?: TIcon;
  showDetailsButton?: boolean;
  text: string;
}>();

const emit = defineEmits(["close", "show-details"]);
</script>

<template>
  <div class="inline-flex items-stretch rounded-lg shadow-md pointer-events-auto">
    <div class="flex items-center space-x-2 px-4 h-8 text-white bg-black rounded-l-lg">
      <BIcon v-if="icon" :name="icon" />
      <span class="text-sm cursor-default">{{ text }}</span>
    </div>
    <button
      v-if="showDetailsButton"
      class="px-4 h-8 text-sm text-action bg-black border-l border-gray-600 hover:bg-gray-800 focus:outline-none focus:shadow-outline"
      @click="emit('show-details')"
    >
      Details
    </button>
    <button
      class="flex items-center justify-center px-3 h-8 text-white bg-black rounded-r-lg border-l border-gray-600 hover:bg-gray-800 focus:outline-none focus:shadow-outline"
      @click="emit('close')"
    >
      <BIcon name="close" class="text-white" />
    </button>
  </div>
</template>
