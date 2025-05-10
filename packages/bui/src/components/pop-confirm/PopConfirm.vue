w<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { TButtonType } from "../types";
import { nextTick, ref } from "vue";
import { BConfirmCancel, BPopper, BPopperContent } from "../";
import { type ConfirmCancelProps } from "../confirm-cancel/types";
import { useTrapFocus } from "../../";

withDefaults(
  defineProps< ConfirmCancelProps & {
    title?: string;
    description?: string;
    placement?: Placement;
    tagName?: string;
  }>(),
  {
    placement: "bottom",
    tagName: "span",
  },
);

const emit = defineEmits(["cancel", "close", "confirm"]);

const popperRef = ref<typeof BPopper>();
const contentRef = ref<HTMLDivElement>();
const { trapFocus } = useTrapFocus(contentRef);

const close = () => {
  emit("close");
  popperRef.value && popperRef.value.close();
};

const onOpen = () => nextTick(trapFocus);

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
  <BPopper ref="popperRef" trigger="click" :placement="placement" @open="onOpen" @close="close">
    <template #default="slotProps">
      <div class="inline-flex">
        <slot name="trigger" :visible="slotProps && slotProps.visible" />
      </div>
    </template>
    <template #content>
      <BPopperContent>
        <div
          ref="contentRef"
          class="flex flex-col max-w-72"
          :class="{
            'p-4 gap-4': title || description,
            'p-2': !(title || description),
          }"
        >
          <section v-if="title || description" class="flex flex-col gap-0">
            <h5>{{ title }}</h5>
            <p class="text-sm text-secondary">{{ description }}</p>
          </section>
          <BConfirmCancel
            :vertical="!(title || description)"
            :small="small"
            :cancel-variant="(cancelVariant as ButtonVariant)"
            :confirm-variant="(confirmVariant as ButtonVariant)"
            :confirm-icon="(confirmIcon as TIcon)"
            :cancel-icon="(cancelIcon as TIcon)"
            :confirm-label="confirmLabel"
            :cancel-label="cancelLabel"
            :confirm-disabled="confirmDisabled"
            :cancel-disabled="cancelDisabled"
            :fillContainer="fillContainer || (title || description)"
            :loading="loading"
            order="confirm-last"
            @cancel="onCancel"
            @confirm="onConfirm"
          />
        </div>
      </BPopperContent>
    </template>
  </BPopper>
</template>
