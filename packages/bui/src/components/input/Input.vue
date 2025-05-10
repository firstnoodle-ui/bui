<script setup lang="ts">
import type { InputTypeHTMLAttribute } from "vue";
import type { TIcon } from "../types";
import { computed, ref } from "vue";
import { BIcon } from "../";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    icon?: TIcon;
    multiline?: boolean;
    placeholder?: string;
    value: string;
    inputType?: InputTypeHTMLAttribute;
    autoFocus?: boolean;
  }>(),
  {
    disabled: false,
    multiline: false,
    placeholder: "Write something...",
  },
);

const emit = defineEmits(["change", "enter"]);

const textareaRef = ref<HTMLTextAreaElement>();
const inputRef = ref<HTMLInputElement>();

const outerClass = computed(() => {
  const result = [];
  result.push(props.disabled ? "bg-secondary border-weak text-secondary" : "bg-primary border-default text-primary shadow-sm-inner-sm");
  result.push(props.icon ? "pr-3 pl-8" : "px-3");
  return result;
});

const focus = () => {
  if (props.multiline) (textareaRef.value as HTMLTextAreaElement).focus();
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

const onBlur = (event: Event) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
};

defineExpose({ focus });
</script>

<template>
  <div
    class="relative overflow-hidden inline-block w-full text-sm leading-tight rounded-md border focus:shadow-sm-inner focus:outline-hidden focus-within:border-blue-500"
    :class="outerClass"
  >
    <div
      v-if="icon"
      class="absolute top-0 left-0 pr-1 pl-2 h-full flex rounded-lg bg-transparent cursor-pointer"
      :class="{
        'items-start py-2': multiline,
        'items-center': !multiline,
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
      class="py-2 w-full text-sm leading-tight bg-transparent focus:outline-hidden"
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
      class="py-2 w-full text-sm leading-tight bg-transparent focus:outline-hidden"
      @change.stop.prevent
      @keydown.enter.stop.prevent="onEnter"
      @keyup.enter.stop.prevent
      @blur="onBlur"
      @input.stop.prevent="onInput"
    >
  </div>
</template>
