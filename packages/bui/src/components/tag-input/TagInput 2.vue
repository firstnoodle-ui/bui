<script setup lang="ts">
import { BFlexbox } from '../flexbox';
import { BIcon } from '../icon';
import { BTooltip } from '../tooltip';
import { hasValue } from '../../utils/type-utils';

defineProps<{
  label: string;
  error?: string;
}>();
const emit = defineEmits(["delete"]);
</script>

<template>
  <BTooltip :text="error">
    <BFlexbox
      tabindex="0"
      @keyup.delete="emit('delete')"
      class="gap-1 h-6 pl-2 pr-1 rounded-md border cursor-default"
      :class="{
        'border-default text-primary': !hasValue(error),
        'border-red-400 text-red-400 focus:bg-red-400 focus:text-white': hasValue(error)
      }">
      <div class="text-xs">{{ label }}</div>
      <button @click="emit('delete')" class="group cursor-pointer w-4 h-4 rounded hover:bg-secondary active:bg-tertiary">
        <BIcon name="close" class="text-muted group-hover:text-primary" />
      </button>
    </BFlexbox>
  </BTooltip>
</template>