<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { TPopperTrigger } from "../types";
import { BPopper } from "../popper";

withDefaults(
  defineProps<{
    bgColorClass?: string;
    delay?: number;
    forceShow?: boolean;
    offsetMain?: number;
    offsetCross?: number;
    placement?: Placement;
    text?: string;
    textColorClass?: string;
    trigger?: TPopperTrigger;
    triggerFullWidth?: boolean;
  }>(),
  {
    bgColorClass: "bg-black",
    delay: 10,
    forceShow: false,
    offsetMain: 2,
    offsetCross: 0,
    placement: "top",
    textColorClass: "text-light",
    trigger: "hover",
    triggerFullWidth: false,
  },
);
</script>

<template>
  <BPopper
    :trigger="trigger"
    :open-delay="delay"
    disable-click-outside
    :offset-main="offsetMain"
    :offset-cross="offsetCross"
    :root-class="triggerFullWidth ? 'w-full flex' : 'inline-flex'"
    :trigger-class="triggerFullWidth ? 'w-full flex' : 'inline-flex'"
    :placement="placement"
  >
    <slot />
    <template #content>
      <div class="z-50 min-w-0 px-2 py-1 rounded-md text-sm shadow-md" :class="[bgColorClass, textColorClass]">
        <span v-if="text">
          {{ text }}
        </span>
        <slot name="content" />
      </div>
    </template>
  </BPopper>
</template>
