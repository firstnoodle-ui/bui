<template>
  <div
    class="relative overflow-hidden inline-block w-full text-sm leading-tight rounded-md border focus:shadow-inner focus:outline-none focus-within:border-blue-500"
    :class="outerClass"
  >
    <div
      v-if="icon"
      class="absolute top-0 left-0 pr-1 pl-2 h-full flex rounded-lg bg-transparent cursor-pointer"
      :class="{
        'items-start py-2': multiline,
        'items-center': !multiline
      }"
    >
      <BIcon :name="icon" class="text-secondary" />
    </div>
    <textarea
      :autofocus="multiline === true && autoFocus === true"
      v-if="multiline"
      ref="textareaRef"
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      class="py-2 w-full text-sm leading-tight bg-transparent focus:outline-none"
      @input.stop.prevent="onInput"
    />
    <input
      :auto-focus="!multiline && autoFocus === true"
      :disabled="disabled"
      :type="inputType"
      v-else
      ref="inputRef"
      :value="value"
      :placeholder="placeholder"
      class="py-2 w-full text-sm leading-tight bg-transparent focus:outline-none"
      @input.stop.prevent="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, InputTypeHTMLAttribute, ref } from "vue";
import { BIcon } from "@/bui/components";
import { TIcon } from "@/bui/types";

const emit = defineEmits(["change"]);

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    icon?: TIcon;
    multiline?: boolean;
    placeholder?: string;
    value: string | number;
    inputType?: InputTypeHTMLAttribute;
    autoFocus?: boolean;
  }>(),
  {
    disabled: false,
    multiline: false,
    placeholder: "Write something..."
  }
);

const textareaRef = ref<HTMLTextAreaElement>();
const inputRef = ref<HTMLInputElement>();

const outerClass = computed(() => {
  const result = [];
  result.push(props.disabled ? "bg-medium border-subtle text-secondary" : "bg-light border-default text-primary shadow-inner-sm");
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

defineExpose({ focus });
</script>
