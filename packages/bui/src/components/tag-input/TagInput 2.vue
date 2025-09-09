<script setup lang="ts">
import { hasValue } from "../../utils/type-utils";
import { BFlexbox } from "../flexbox";
import { BIcon } from "../icon";
import { BTooltip } from "../tooltip";

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
      class="gap-1 h-6 pl-2 pr-1 rounded-md border cursor-default"
      :class="{
        'border-default text-primary': !hasValue(error),
        'border-red-400 text-red-400 focus:bg-red-400 focus:text-white': hasValue(error),
      }"
      @keyup.delete="emit('delete')"
    >
      <div class="text-xs">
        {{ label }}
      </div>
      <button class="group cursor-pointer w-4 h-4 rounded hover:bg-secondary active:bg-tertiary" @click="emit('delete')">
        <BIcon name="close" class="text-muted group-hover:text-primary" />
      </button>
    </BFlexbox>
  </BTooltip>
</template>
