<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import type { TIcon } from "../types";
import { ref } from "vue";
import { BIcon } from "../";
import { clamp } from "../../utils";
import StepButton from "./StepButton.vue";

const {
  disabled = false,
  icon,
  placeholder = "Write",
  value,
  min,
  max,
  showSteppers = true,
  size = "default",
  variant = "border",
} = defineProps<{
  disabled?: boolean;
  icon?: TIcon;
  placeholder?: string;
  value: number;
  min?: number;
  max?: number;
  size?: "default" | "small";
  variant?: "border" | "fill";
  inputType?: InputTypeHTMLAttribute;
  autoFocus?: boolean;
  showSteppers?: boolean;
}>();

const emit = defineEmits(["change", "enter"]);

const inputRef = ref<HTMLInputElement>();
const upButtonRef = ref<typeof StepButton>();
const downButtonRef = ref<typeof StepButton>();

const focus = () => {
  (inputRef.value as HTMLInputElement).focus();
};

const onInput = (event: Event) => {
  if (event.target) {
    emit("change", Number.parseInt((event.target as HTMLInputElement).value));
  }
};

const onEnter = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  emit("enter");
};

const onArrowKey = (direction: -1 | 1, active: boolean) => {
  if (direction === 1) {
    upButtonRef.value?.setActive(active);
  }
  else {
    downButtonRef.value?.setActive(active);
  }
};

const onStep = (direction: 1 | -1) => {
  emit("change", clamp(value + direction, min ?? null, max ?? null));
};

const onBlur = (event: Event) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
};

defineExpose({ focus });
</script>

<template>
  <div
    class="relative flex-1 w-full overflow-hidden overscroll-none inline-flex items-center pr-0 rounded-lg border focus:shadow-sm-inner focus:outline-hidden focus-within:border-action"
    :class="{
      'bg-primary border-default text-primary': variant === 'border' && !disabled,
      'bg-secondary border-weak text-secondary': variant === 'border' && disabled,
      'bg-tertiary border-transparent text-primary': variant === 'fill' && !disabled,
      'bg-tertiary border-weak text-secondary': variant === 'fill' && disabled,
      'h-8': size === 'default',
      'pl-2': size === 'default' && !icon,
      'h-6': size === 'small',
      'pl-1.5': size === 'small' && !icon,
      'pl-0': icon,
    }"
  >
    <div
      v-if="icon"
      class="flex-none flex rounded-lg bg-transparent cursor-pointer"
      :class="{
        'px-2': size === 'default',
        'px-1.5': size === 'small',
      }"
    >
      <BIcon :name="icon" class="text-secondary" />
    </div>
    <input
      ref="inputRef"
      type="number"
      :min="min"
      :max="max"
      :auto-focus="autoFocus === true"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      class="flex-1 min-w-0 bg-transparent focus:outline-hidden"
      :class="{
        'text-xs': size === 'small',
        'text-sm': size === 'default',
      }"
      @change.stop.prevent
      @keydown.enter.stop.prevent="onEnter"
      @keyup.enter.stop.prevent
      @keydown.up="onArrowKey(1, true)"
      @keyup.up="onArrowKey(1, false)"
      @keydown.down="onArrowKey(-1, true)"
      @keyup.down="onArrowKey(-1, false)"
      @blur="onBlur"
      @input.stop.prevent="onInput"
    >
    <section
      v-if="showSteppers"
      class="top-0 flex flex-col h-full -space-y-px -mt-[2px] -mr-px"
      :class="{
        'w-8': size === 'default',
        'w-6': size === 'small',
      }"
    >
      <StepButton ref="upButtonRef" direction="up" :size="size" @click="onStep(1)" />
      <StepButton ref="downButtonRef" direction="down" :size="size" @click="onStep(-1)" />
    </section>
  </div>
</template>
