<script setup lang="ts">
import type { TIcon } from "../types";
import { ref } from "vue";
import { BIcon, BNotificationBadge } from "../../";

const props = withDefaults(
  defineProps<{
    icon?: TIcon;
    grow?: boolean;
    name: string;
    notification?: boolean;
    selected: boolean;
    type?: "default" | "pill";
    size?: "small" | "default";
    disabled?: boolean;
  }>(),
  {
    grow: false,
    notification: false,
    size: "default",
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
    class="cursor-pointer"
    :class="{
      'text-sm gap-2 px-4 h-8': size === 'default' && type === 'default',
      'text-xs gap-1 px-3 h-6': size === 'small' && type === 'default',
      'relative flex items-center justify-center border-b focus:outline-hidden focus-visible:outline': type === 'default',
      'border-action text-action': selected && type === 'default',
      'border-default text-tertiary hover:text-secondary active:text-action hover:border-strong': !selected && type === 'default',
      'text-sm px-3 h-8 rounded-lg': size === 'default' && type === 'pill',
      'text-xs px-2 h-6 rounded': size === 'small' && type === 'pill',
      'relative flex items-center justify-center gap-1 border border-transparent focus:outline-hidden': type === 'pill',
      'bg-tertiary text-primary hover:bg-tertiary hover:text-primary': selected && type === 'pill',
      'text-tertiary hover:bg-secondary active:bg-tertiary active:text-primary':
        !disabled && !selected && type === 'pill',
      'text-muted': disabled,
      'flex-grow': grow,
    }"
    @click.stop.prevent="onSelect"
  >
    <BIcon v-if="icon && size === 'default'" :name="icon" />
    <span class="relative">
      {{ name }}
      <div v-if="notification" class="absolute" style="top: 0em; right: -0.6em">
        <BNotificationBadge />
      </div>
    </span>
  </button>
</template>
