<script setup lang="ts">
import type { TIcon } from "../../types";
import { BFlexbox, BIcon, BTooltip } from "../../";

withDefaults(
  defineProps<{
    active?: boolean;
    disabled?: boolean;
    highlight?: boolean;
    icon?: TIcon;
    label?: string;
    tooltip?: string;
  }>(),
  {
    active: false,
    disabled: false,
    highlight: false,
  },
);

const emit = defineEmits(["click"]);
</script>

<template>
  <BTooltip :text="tooltip" :delay="200">
    <BFlexbox
      tag="button"
      inline
      justify="center"
      class="h-8 gap-2 rounded-lg border border-transparent focus:outline-hidden focus:border-strong"
      :class="{
        'bg-tertiary text-primary font-bold': active && !highlight,
        'bg-tertiary text-action border border-default': highlight,
        'text-tertiary bg-transparent': !active && !disabled && !highlight,
        'hover:bg-secondary': !disabled,
        'text-muted': disabled && !highlight,
        'w-8': icon && !label,
        'px-2': label,
      }"
      @click="!disabled && emit('click')"
    >
      <BIcon v-if="icon" :name="icon" />
      <span v-if="label" class="text-xs leading-none">{{ label }}</span>
    </BFlexbox>
  </BTooltip>
</template>
