<script setup lang="ts">
import CircleIndicator from "./CircleIndicator.vue";
import DefaultIndicator from "./DefaultIndicator.vue";

withDefaults(
  defineProps<{
    button?: boolean;
    label?: string;
    type?: "default" | "circle";
    value?: number;
    disabled?: boolean;
  }>(),
  {
    button: false,
    type: "default",
    value: 0,
    disabled: false,
  },
);

const emit = defineEmits(["click"]);
</script>

<template>
  <div
    class="items-center space-x-2"
    :class="{
      'flex': !button,
      'inline-flex border rounded-md h-8 px-3': button,
      'border-action': value && !disabled,
      'border-default': !value && !disabled,
      'border-subtle cursor-default': disabled,
      'cursor-pointer': !disabled,
    }"
    @click.stop.prevent="!disabled && emit('click')"
  >
    <DefaultIndicator v-if="type === 'default'" :value="value" :disabled="disabled" />
    <CircleIndicator v-else :value="value" :disabled="disabled" />
    <span
      v-if="label"
      class="block text-sm leading-tight select-none"
      :class="{
        'text-action': button && value,
        'text-secondary': button && !value && !disabled,
        'hover:underline': !button && !disabled,
        'text-tertiary': disabled,
      }"
    >
      {{ label }}
    </span>
  </div>
</template>
