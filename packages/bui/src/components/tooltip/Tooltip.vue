<script setup lang="ts">
import type { OffsetOptions, Placement } from "../../types/floating-ui";
import type { TPopperTrigger } from "../types";
import { ref } from "vue";
import { BPopper } from "../popper";

const props = withDefaults(defineProps<{
  bgColorClass?: string;
  delay?: number;
  offsetOptions?: Partial<OffsetOptions>;
  placement?: Placement;
  text?: string | null;
  textColorClass?: string;
  trigger?: TPopperTrigger;
  triggerFullWidth?: boolean;
}>(), {
  bgColorClass: "bg-black",
  delay: 10,
  offsetMain: 2,
  offsetCross: 0,
  placement: "top",
  textColorClass: "text-white",
  trigger: "hover",
  triggerFullWidth: false,
});

const popperRef = ref<typeof BPopper>();
defineExpose({ hide: () => {
  if (popperRef.value) {
    popperRef.value.close();
  }
} });
</script>

<template>
  <BPopper
    ref="popperRef"
    disable-click-outside
    :trigger="props.trigger"
    :open-delay="props.delay"
    :offset-options="offsetOptions"
    :root-class="props.triggerFullWidth ? 'w-full flex overflow-hidden' : 'inline-flex overflow-hidden'"
    :trigger-class="props.triggerFullWidth ? 'w-full flex overflow-hidden' : 'inline-flex overflow-hidden'"
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
