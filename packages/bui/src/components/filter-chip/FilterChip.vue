<script setup lang="ts">
import { BDeleteButton } from "../delete-button";

const { count = 0, deletable = false } = defineProps<{
  label: string;
  active: boolean;
  deletable?: boolean;
  count?: number;
}>();
defineEmits(["click", "delete"]);
</script>

<template>
  <button
    class="h-6 py-2 rounded-md flex items-center gap-1 cursor-pointer"
    :class="{
      'px-2 border border-default text-tertiary hover:bg-secondary hover:text-secondary hover:border-strong active:bg-tertiary active:text-primary active:border-strong': !active,
      'border border-transparent text-white bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800': active,
      'pl-2 pr-1': active && deletable,
      'px-2': active && !deletable,
    }"
    @click="$emit('click')"
  >
    <span class="text-sm">{{ label }}</span>
    <span v-if="active && count" class="h-4 px-1 min-w-4 flex items-center justify-center rounded-full text-xs font-medium bg-black/15 ">{{ count }}</span>
    <BDeleteButton v-if="deletable && active" data-theme="dark" @click="$emit('delete')" />
  </button>
</template>
