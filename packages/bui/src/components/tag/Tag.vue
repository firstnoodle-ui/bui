<script setup lang="ts">
import type { TIcon } from "../types";
import { BButton, BFlexbox, BIcon } from "../";

withDefaults(
  defineProps<{
    label: string;
    icon?: TIcon;
    deletable?: boolean;
  }>(),
  {
    deletable: false,
  },
);

const emit = defineEmits(["delete"]);
</script>

<template>
  <BFlexbox
    inline
    class="h-5 truncate text-xs rounded-lg text-tertiary bg-tertiary"
    :class="{
      'px-1': !deletable,
      'pl-1 pr-0.5': deletable,
    }"
  >
    <BFlexbox class="gap-1">
      <BIcon v-if="icon" :name="icon" />
      <span class="truncate">{{ label }}</span>
    </BFlexbox>
    <BButton v-if="deletable" small variant="textSubtle" icon="close" class="ml-0.5" stop-propagation @click="emit('delete')" />
  </BFlexbox>
</template>
