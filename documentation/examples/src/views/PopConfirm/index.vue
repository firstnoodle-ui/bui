<script setup lang="ts">
// import { useTrapFocus } from "@/composables/useTrapFocus";
import type { TButtonType } from "@firstnoodle-ui/bui";
import type { Placement } from "@floating-ui/dom";
import { BButton, BPopper, BPopperContent } from "@firstnoodle-ui/bui";
import { ref } from "vue";

withDefaults(
  defineProps<{
    cancelLabel?: string;
    cancelType?: TButtonType;
    confirmLabel?: string;
    confirmType?: TButtonType;
    disabled?: boolean;
    placement?: Placement;
    tagName?: string;
  }>(),
  {
    cancelLabel: "Cancel",
    cancelType: "primary",
    confirmLabel: "Confirm",
    confirmType: "error",
    disabled: false,
    placement: "bottom",
    tagName: "span",
  },
);

const emit = defineEmits(["cancel", "close", "confirm"]);

const popperRef = ref<typeof BPopper>();
const contentRef = ref<HTMLDivElement>();
// const { trapFocus } = useTrapFocus(contentRef);

const close = () => {
  emit("close");
  popperRef.value && popperRef.value.close();
};

// const onOpen = () => nextTick(trapFocus);

const onCancel = () => {
  close();
  emit("cancel");
};

const onConfirm = () => {
  close();
  emit("confirm");
};
</script>

<template>
  <!-- <b-popper ref="popperRef" trigger="click" :placement="placement" @open="onOpen" @close="close"> -->
  <BPopper ref="popperRef" trigger="click" :placement="placement" @close="close">
    <template #default="slotProps">
      <div class="inline-flex">
        <slot name="reference" :visible="slotProps && slotProps.visible" />
      </div>
    </template>
    <template #content>
      <BPopperContent>
        <div ref="contentRef" class="flex flex-col px-2 py-2 space-y-2">
          <BButton bordered :type="cancelType" :label="cancelLabel" @click="onCancel" />
          <BButton bordered :label="confirmLabel" :type="confirmType" @click="onConfirm" />
        </div>
      </BPopperContent>
    </template>
  </BPopper>
</template>
