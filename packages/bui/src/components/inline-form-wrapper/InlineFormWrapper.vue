<script setup lang="ts">
import type { ConfirmCancelProps } from "..";
import { BConfirmCancel, BFlexbox } from "..";

const {
  cancelLabel = "Cancel",
  confirmLabel = "Save",
  loading = false,
} = defineProps<ConfirmCancelProps & {
  loading?: boolean;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();
</script>

<template>
  <BFlexbox
    col
    tabindex="0"
    class="border border-default bg-primary rounded-lg focus:outline-none focus-within:shadow-sm focus-within:border-action"
  >
    <slot />
    <BFlexbox tag="footer" justify="between" class="gap-2 px-2 py-2 border-t border-default">
      <BFlexbox>
        <slot name="footer-left" />
      </BFlexbox>
      <BFlexbox class="gap-2">
        <BConfirmCancel
          small
          order="confirm-last"
          :loading="loading"
          :confirm-label="confirmLabel"
          :confirm-disabled="confirmDisabled"
          :cancel-label="cancelLabel"
          @cancel="emit('cancel')"
          @confirm="emit('confirm')"
        />
      </BFlexbox>
    </BFlexbox>
  </BFlexbox>
</template>
