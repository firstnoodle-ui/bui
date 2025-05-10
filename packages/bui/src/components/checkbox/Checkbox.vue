<script setup lang="ts">
import CircleIndicator from "./CircleIndicator.vue";
import DefaultIndicator from "./DefaultIndicator.vue";
import { type TCheckboxType } from "../types";

const { checked, type = "default", indeterminate = false, disabled = false } = defineProps<{
  label?: string;
  type?: TCheckboxType;
  checked: boolean;
  indeterminate?: boolean,
  disabled?: boolean;
}>()

const emit = defineEmits(["click"]);
</script>

<template>
  <div
    class="group flex items-center space-x-2"
    :class="{
      'border-action': checked && !disabled,
      'border-default': !checked && !disabled,
      'border-subtle cursor-default': disabled,
      'cursor-pointer': !disabled,
    }"
    @click.stop.prevent="!disabled && emit('click')"
  >
    <DefaultIndicator
      v-if="type === 'default'"
      :value="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
    />
    <CircleIndicator
      v-else
      :value="checked"
      :disabled="disabled"
      :indeterminate="indeterminate"
    />
    <span
      v-if="label"
      class="block text-sm leading-tight select-none"
      :class="{
        'hover:underline': !disabled,
        'text-tertiary': disabled,
      }"
    >
      {{ label }}
    </span>
  </div>
</template>
