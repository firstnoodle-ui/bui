<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import type { TIcon } from "../types";
import { clamp } from "../../utils";
import { ref } from "vue";
import { BIcon } from "../";
import StepButton from "./StepButton.vue";

const {
  disabled = false,
  icon,
  placeholder = 'Write',
  value = 0,
  min,
  max
} = defineProps<{
  disabled?: boolean;
  icon?: TIcon;
  placeholder?: string;
  value: number;
  min?: number;
  max?: number;
  inputType?: InputTypeHTMLAttribute;
  autoFocus?: boolean;
}>()

const emit = defineEmits(["change", "enter"]);

const inputRef = ref<HTMLInputElement>();
const upButtonRef = ref<typeof StepButton>();
const downButtonRef = ref<typeof StepButton>();

const focus = () => {
  (inputRef.value as HTMLInputElement).focus();
};

const onInput = (event: Event) => {
  console.log('onInput', event);
  if (event.target) {
    emit("change", parseInt((event.target as HTMLInputElement).value));
  }
};

const onEnter = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  emit("enter");
};

const onArrowKey = (direction:-1|1, active:boolean) => {
  if(direction === 1) {
    upButtonRef.value?.setActive(active);
  } else {
    downButtonRef.value?.setActive(active);
  }
}

const onStep = (direction:1|-1) => {
  emit('change', clamp(value + direction, min??null, max??null));
}

const onBlur = (event: Event) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
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
      'pl-3': !icon
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
      :value="value"
      :placeholder="placeholder"
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
      <StepButton ref="upButtonRef" direction="up" @click="onStep(1)" />
      <StepButton ref="downButtonRef" direction="down" @click="onStep(-1)" />
    </section>
  </div>
</template>
