<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { TPopperTrigger } from "../types";
import { BPopper } from "../popper";

const props = withDefaults(
  defineProps<{
    bgColorClass?: string;
    delay?: number;
    offsetMain?: number;
    offsetCross?: number;
    placement?: Placement;
    text?: string | null;
    textColorClass?: string;
    trigger?: TPopperTrigger;
    triggerFullWidth?: boolean;
  }>(),
  { bgColorClass: "bg-black", delay: 10, offsetMain: 2, offsetCross: 0, placement: "top", textColorClass: "text-white", trigger: "hover", triggerFullWidth: false },
);
</script>

<template>
  <BPopper
    :trigger="props.trigger"
    :open-delay="props.delay"
    disable-click-outside
    :offset-options="{ offsetMain: props.offsetMain, offsetCross: props.offsetCross }"
    :root-class="props.triggerFullWidth ? 'w-full flex' : 'inline-flex'"
    :trigger-class="props.triggerFullWidth ? 'w-full flex' : 'inline-flex'"
    :placement="props.placement"
  >
    <slot />
    <template #content>
      <div v-if="props.text" class="z-50 min-w-0 px-2 py-1 rounded-md text-sm shadow-sm-md" :class="[props.bgColorClass, props.textColorClass]">
        <span>
          {{ props.text }}
        </span>
        <slot name="content" />
      </div>
    </template>
  </BPopper>
</template>
