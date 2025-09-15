<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { TPopperTrigger } from "../types";
import { BPopper } from "../popper";

const {
  bgColorClass = "bg-black",
  delay = 10,
  offsetMain = 2,
  offsetCross = 0,
  placement = "top",
  textColorClass = "text-white",
  trigger = "hover",
  triggerFullWidth = false,
} = defineProps<{
  bgColorClass?: string;
  delay?: number;
  offsetMain?: number;
  offsetCross?: number;
  placement?: Placement;
  text?: string | null;
  textColorClass?: string;
  trigger?: TPopperTrigger;
  triggerFullWidth?: boolean;
}>();
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
      <div v-if="text" class="z-50 min-w-0 px-2 py-1 rounded-md text-sm shadow-sm-md" :class="[bgColorClass, textColorClass]">
        <span>
          {{ text }}
        </span>
        <slot name="content" />
      </div>
    </template>
  </BPopper>
</template>
