<script setup lang="ts">
import type { SelectListOption, SelectOptionVariant } from "../../types";
import { computed } from "vue";
import { BButton, BCheckbox, BIcon, BTextHighlight } from "../../../";

const { hoveredOption, selected, option, variant = "checkbox", small = false } = defineProps<{
  hoveredOption?: SelectListOption | null;
  option: SelectListOption;
  selected: boolean;
  search?: string;
  small?: boolean;
  variant?: SelectOptionVariant;
}>();

const emit = defineEmits(["click", "delete", "focus", "hover"]);

const isButton = computed(() => variant === "checkbox" || variant === "single");
const highlighted = computed(() => {
  if (hoveredOption) {
    if ("id" in hoveredOption && "id" in option) {
      return hoveredOption.id === option.id;
    }
    return hoveredOption && hoveredOption.label === option.label;
  }
  return false;
});

const onToggle = () => emit("click");
</script>

<template>
  <li class="list-none flex items-center w-full overflow-hidden bg-primary">
    <component
      :is="isButton ? 'button' : 'div'"
      class="cursor-pointer w-full overflow-hidden rounded-lg flex items-center px-2 py-1 gap-2 hover:bg-secondary active:bg-tertiary"
      :class="{
        '': variant === 'checkbox',
        'bg-secondary': highlighted,
        'h-6 text-xs': small,
        'h-9 text-sm': !small,
      }"
      @click="onToggle"
      @mouseover="emit('hover', option)"
      @focus="emit('focus', option)"
    >
      <main class="flex-1 w-full overflow-hidden flex items-center gap-2">
        <BCheckbox
          v-if="variant === 'checkbox'"
          :checked="selected"
          class="flex-0"
          @click="onToggle"
        />
        <BIcon
          v-if="option.icon"
          :name="option.icon"
          class="w-4 h-4 flex-0"
          :class="{
            'text-action': selected && variant === 'single',
          }"
        />
        <BTextHighlight
          background-color="yellow"
          :value="option.label"
          :highlight="search"
          class="flex-1 pl-1 -ml-1 text-left min-w-0 truncate"
          :class="{
            'text-action': selected && variant === 'single',
            'text-xs': small,
            'text-sm': !small
          }"
        />
      </main>
      <span v-if="option.suffix" class="flex-0 text-sm text-secondary" :class="{ 'text-xs': small, 'text-sm': !small }">{{ option.suffix }}</span>
      <BButton
        v-if="variant === 'deletable'"
        small
        icon="close"
        variant="text"
        @click="emit('delete')"
      />
    </component>
  </li>
</template>
