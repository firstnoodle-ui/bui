<script setup lang="ts">
import type { TPopSelectOption } from "../types";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    disabled?: boolean;
    hoveredOption: TPopSelectOption | null;
    selected?: boolean;
  }>(),
  {
    disabled: false,
    selected: false,
  },
);

const emit = defineEmits(["click", "focus", "hover"]);

const root = ref();

const highlighted = computed(() => {
  return props.hoveredOption && props.hoveredOption.label === props.label;
});

const onOptionClick = () => {
  if (props.disabled) return;
  emit("click");
};
</script>

<template>
  <div
    ref="root"
    tabindex="0"
    class="flex items-center justify-between w-full h-8 px-3 space-x-2 text-sm focus:outline-hidden"
    :class="{
      'cursor-not-allowed text-muted ': disabled,
      'cursor-pointer text-primary hover:bg-blue-100 focus:bg-blue-100': !disabled && !selected,
      'cursor-pointer text-light-blue font-medium hover:bg-blue-100 focus:bg-blue-100': selected,
      'bg-blue-100': highlighted,
      'bg-light': !highlighted,
    }"
    @click="onOptionClick"
    @keydown.enter.prevent="onOptionClick"
    @mouseover="emit('hover', label)"
    @focus="emit('focus', label)"
  >
    <slot />
  </div>
</template>
