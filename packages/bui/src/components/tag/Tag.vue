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
    align="center"
    class="h-8 leading-tight truncate text-sm border rounded-lg border-sand-grey-15 text-secondary bg-sand-grey-40"
    :class="{
      'px-2': !deletable,
      'pl-2 pr-1': deletable,
    }"
  >
    <BIcon v-if="icon" :name="icon" class="mr-1" />
    <slot v-if="$slots.default" />
    <span v-else class="truncate">{{ label }}</span>
    <BButton v-if="deletable" small icon="close" class="ml-1" stop-propagation @click="emit('delete')" />
  </BFlexbox>
</template>
