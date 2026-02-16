<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import type { TIcon } from "../types";
import { onMounted, ref } from "vue";
import { BButton, BIcon } from "../";

// size and variant props

const {
  disabled = false,
  icon,
  multiline = false,
  placeholder = "Write",
  autoFocus = false,
  size = "default",
  variant = "border",
} = defineProps<{
  disabled?: boolean;
  clearable?: boolean;
  icon?: TIcon;
  multiline?: boolean;
  placeholder?: string;
  size?: "default" | "small";
  value: string;
  variant?: "border" | "fill";
  inputType?: InputTypeHTMLAttribute;
  autoFocus?: boolean;
}>();

const emit = defineEmits(["change", "enter", "escape"]);

const textareaRef = ref<HTMLTextAreaElement>();
const inputRef = ref<HTMLInputElement>();

onMounted(() => {
  if (autoFocus) {
    if (multiline) {
      textareaRef.value?.focus();
    }
    else {
      inputRef.value?.focus();
    }
  }
});

const focus = () => {
  if (multiline) (textareaRef.value as HTMLTextAreaElement).focus();
  else (inputRef.value as HTMLInputElement).focus();
};

const onInput = (event: Event) => {
  if (event.target) {
    emit("change", (event.target as HTMLInputElement).value);
  }
};

const onEnter = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  emit("enter");
};
const onEscape = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  emit("escape");
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
    class="relative flex-1 w-full overflow-hidden inline-flex items-center text-sm rounded-lg border focus:shadow-sm-inner focus:outline-hidden focus-within:border-action"
    :class="{
      'bg-primary border-default text-primary': variant === 'border' && !disabled,
      'bg-secondary border-weak text-secondary': variant === 'border' && disabled,
      'bg-tertiary border-transparent text-primary': variant === 'fill' && !disabled,
      'bg-tertiary border-weak text-secondary': variant === 'fill' && disabled,
      'h-8': size === 'default' && !multiline,
      'pl-2': size === 'default' && !icon,
      'h-6': size === 'small' && !multiline,
      'pl-1.5': size === 'small' && !icon,
      'pl-0': icon,
      'pr-1': clearable && value.length && size === 'default',
      'pr-0.5': clearable && value.length && size === 'small',
      'pr-0': !(clearable && value.length),
    }"
  >
    <div
      v-if="icon"
      class="flex-none h-full flex rounded-lg bg-transparent cursor-pointer"
      :class="{
        'items-start py-2': multiline,
        'items-center': !multiline,
        'px-2': size === 'default',
        'px-1.5': size === 'small',
      }"
    >
      <BIcon :name="icon" class="text-secondary" />
    </div>
    <textarea
      v-if="multiline"
      ref="textareaRef"
      :autofocus="multiline === true && autoFocus === true"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      class="flex-1 py-2 w-full bg-transparent focus:outline-hidden"
      :class="{
        'text-xs': size === 'small',
        'text-sm': size === 'default',
      }"
      @input.stop.prevent="onInput"
    />
    <input
      v-else
      ref="inputRef"
      :auto-focus="!multiline && autoFocus === true"
      :disabled="disabled"
      :type="inputType"
      :value="value"
      :placeholder="placeholder"
      class="flex-1 min-w-0 bg-transparent focus:outline-hidden"
      :class="{
        'text-xs': size === 'small',
        'text-sm': size === 'default',
      }"
      @change.stop.prevent
      @keydown.enter.stop.prevent="onEnter"
      @keydown.escape.stop.prevent="onEscape"
      @keyup.enter.stop.prevent
      @blur="onBlur"
      @input.stop.prevent="onInput"
    >
    <section v-if="$slots['inline-controls']" class="flex-none px-1">
      <slot name="inline-controls" />
    </section>
    <BButton
      v-if="clearable && value.length"
      small
      icon="close"
      variant="textSubtle"
      class="flex-none hidden"
      @click="
        focus();
        emit('change', '');
      "
    />
  </div>
</template>
