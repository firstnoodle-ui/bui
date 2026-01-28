<script setup lang="ts">
import type { TPopSelectOption } from "../types";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    option: TPopSelectOption;
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
  return props.hoveredOption && props.hoveredOption.id === props.option.id;
});

const onOptionClick = () => {
  if (props.option.disabled) return;
  emit("click");
};
</script>

<template>
  <div
    ref="root"
    tabindex="0"
    class="flex items-center justify-between w-full h-8 px-3 space-x-2 text-sm focus:outline-hidden"
    :class="{
      'cursor-not-allowed text-muted ': option.disabled,
      'cursor-pointer text-primary hover:bg-secondary focus:bg-secondary active:bg-tertiary': !option.disabled && !selected,
      'cursor-pointer text-light-blue font-medium hover:bg-secondary focus:bg-secondary active:bg-tertiary': selected,
      'bg-secondary': highlighted,
      'bg-primary': !highlighted,
    }"
    @click="onOptionClick"
    @keydown.enter.prevent="onOptionClick"
    @mouseover="emit('hover', option.id)"
    @focus="emit('focus', option.id)"
  >
    <slot />
  </div>
</template>
