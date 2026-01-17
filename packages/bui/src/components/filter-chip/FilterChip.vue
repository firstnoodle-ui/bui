<script setup lang="ts">
import { BDeleteButton } from "../delete-button";

const { count = 0, deletable = false } = defineProps<{
  label: string;
  active: boolean;
  deletable?: boolean;
  count?: number;
  focus?: boolean;
}>();
defineEmits(["click", "delete"]);
</script>

<template>
  <button
    class="h-6 py-2 rounded-md flex items-center gap-1 cursor-pointer hover:bg-secondary active:bg-tertiary"
    :class="{
      'border-action bg-secondary': focus && !active,
      'border-default hover:border-strong active:border-strong': !focus && !active,
      'px-2 border text-secondary hover:text-tertiary active:text-primary': !active,
      'bg-secondary': focus && active,
      'border border-action text-action': active,
      'pl-2 pr-1': active && deletable,
      'px-2': active && !deletable,
    }"
    @click="$emit('click')"
  >
    <span class="text-xs">{{ label }}</span>
    <span v-if="active && count" class="h-4 px-1 min-w-4 flex items-center justify-center rounded-full text-xs font-medium bg-tertiary ">{{ count }}</span>
    <BDeleteButton v-if="deletable && active" @click="$emit('delete')" />
  </button>
</template>
