<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import type { TIcon } from "../types";
import { computed, ref } from "vue";
import { BIcon } from "../";
import { clamp } from "../../utils";
import StepButton from "./StepButton.vue";

const {
  disabled = false,
  icon,
  placeholder = "Write",
  value,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
  float = false,
  incrementAmount = 1,
  decimals = 2,
  separator = ".",
  clearable = false,
} = defineProps<{
  disabled?: boolean;
  icon?: TIcon;
  placeholder?: string;
  value: number | null;
  min?: number;
  max?: number;
  inputType?: InputTypeHTMLAttribute;
  autoFocus?: boolean;
  float?: boolean;
  incrementAmount?: number;
  decimals?: number;
  separator?: "." | ",";
  clearable?: boolean;
}>();

const emit = defineEmits(["change", "enter"]);

const inputRef = ref<HTMLInputElement>();
const upButtonRef = ref<typeof StepButton>();
const downButtonRef = ref<typeof StepButton>();
const stepSize = computed<number>(() => float ? (1 / 10 ** decimals) : 1); // HTML elements step size (decimal count)

const displayValue = computed(() => {
  if (value === null || value === undefined) return "";
  const str = float ? Number(value).toFixed(decimals) : String(value);
  return separator === "," ? str.replace(".", ",") : str;
});

const focus = () => {
  (inputRef.value as HTMLInputElement).focus();
};

const calculateNewValue = (input: string): number => {
  // Always replace the separator with a dot for parsing
  const normalized = separator === "," ? input.replace(",", ".") : input;
  let num = float ? Number.parseFloat(normalized) : Number.parseInt(normalized, 10);
  if (Number.isNaN(num)) num = 0;
  num = clamp(num, min, max);
  if (float) num = Number(num.toFixed(decimals));
  return num;
};

const onInput = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  const input = inputEl.value;

  if (input === "") {
    emit("change", clearable ? null : 0);
    return;
  }

  // Allow incomplete numbers with separator while typing
  if (/^-?\d*(?:[.,]\d*)?$/.test(input)) {
    emit("change", calculateNewValue(input));
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

const onStep = (direction: number) => {
  const newValue = calculateNewValue((value === null ? direction : (value + direction)).toString());

  if (newValue !== value && !Number.isNaN(newValue))
    emit("change", newValue);
};

const onBlur = (event: Event) => {
  const inputEl = event.target as HTMLInputElement;
  const input = inputEl.value;

  if (input === "") {
    emit("change", clearable ? null : 0);
    return;
  }

  const newValue = calculateNewValue(input);
  // Set the formatted value with the correct separator
  inputEl.value = separator === "," ? newValue.toFixed(decimals).replace(".", ",") : newValue.toFixed(decimals);
  emit("change", newValue);
};

defineExpose({ focus });
</script>

<template>
  <div
    class="relative overflow-hidden inline-flex items-center h-8 text-sm leading-tight rounded-lg border focus:shadow-sm-inner focus:outline-hidden focus-within:border-blue-500"
    :class="{
      'bg-secondary border-weak text-secondary': disabled,
      'bg-primary border-default text-primary shadow-sm-inner-sm': !disabled,
      'pl-8': icon,
      'pl-3': !icon,
    }"
  >
    <div
      v-if="icon"
      class="absolute top-0 left-0 pr-1 pl-2 h-full flex items-center rounded-lg bg-transparent cursor-pointer"
    >
      <BIcon :name="icon" class="text-tertiary" />
    </div>
    <input
      ref="inputRef"
      type="number"
      :min="min"
      :max="max"
      :auto-focus="autoFocus === true"
      :disabled="disabled"
      :value="displayValue"
      :placeholder="placeholder"
      :step="stepSize"
      class="flex-1 min-w-0 py-2 text-sm leading-tight bg-transparent focus:outline-hidden"
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
    <section class="flex flex-col w-8 h-full -space-y-px -mt-px -mr-px">
      <StepButton ref="upButtonRef" direction="up" @click="onStep(Math.abs(incrementAmount))" />
      <StepButton ref="downButtonRef" direction="down" @click="onStep(-Math.abs(incrementAmount))" />
    </section>
  </div>
</template>
