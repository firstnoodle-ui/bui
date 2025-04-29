<script setup lang="ts">
import type { TIcon } from "../types";
import { ref } from "vue";
import { BIcon } from "../../";

const props = withDefaults(
  defineProps<{
    icon?: TIcon;
    grow?: boolean;
    name: string;
    notification?: boolean;
    selected: boolean;
    type?: "default" | "pill";
    disabled?: boolean;
  }>(),
  {
    grow: false,
    notification: false,
    type: "default",
  },
);

const emit = defineEmits(["select"]);

const tabRef = ref<HTMLButtonElement>();

const onSelect = () => {
  tabRef.value!.blur();
  emit("select", props.name);
};
</script>

<template>
  <button
    ref="tabRef"
    :disabled="disabled"
    class=""
    :class="{
      'relative flex items-center justify-center space-x-1 px-3 h-8 border-b focus:outline-hidden focus:border-action': type === 'default',
      'border-action text-action': selected && type === 'default',
      'border-subtle text-tertiary hover:text-secondary': !selected && type === 'default',
      'relative flex items-center justify-center  px-3 h-8 border border-transparent rounded-lg focus:outline-hidden': type === 'pill',
      'bg-actionLightActive text-action': selected && type === 'pill',
      'text-primary bg-sand-grey-40 hover:text-secondary hover:bg-actionLightHover focus:bg-actionLightActive focus:text-action':
        !disabled && !selected && type === 'pill',
      'text-disabled': disabled,
      'flex-grow': grow,
    }"
    @click.stop.prevent="onSelect"
  >
    <BIcon v-if="icon" :name="icon" />
    <span class="relative text-sm">
      {{ name }}
      <div v-if="notification" class="absolute" style="top: 0.124em; right: -0.65em">
        <div class="w-3 h-3 bg-orange-500 rounded-full border border-white" />
      </div>
    </span>
  </button>
</template>
