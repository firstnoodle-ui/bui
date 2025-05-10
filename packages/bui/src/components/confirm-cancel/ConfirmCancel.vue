<script setup lang="ts">
import type { ConfirmCancelProps } from "./types";
import { computed } from "vue";
import { BButton, BFlexbox } from "../";

const props = withDefaults(
  defineProps<ConfirmCancelProps>(),
  {
    order: "confirm-first",
    cancelButtonIsText: false,
    cancelDisabled: false,
    cancelLabel: "Cancel",
    cancelVariant: "outline",
    confirmDisabled: false,
    confirmLabel: "Confirm",
    confirmVariant: "fill",
    fillContainer: false,
    loading: false,
    small: false,
    vertical: false,
  },
);

const emit = defineEmits(["confirm", "cancel"]);

const confirmFirst = computed(() => props.order === "confirm-first");
</script>

<template>
  <BFlexbox :col="vertical" class="gap-2">
    <BButton
      v-if="confirmFirst"
      :small="small"
      stop-propagation
      :icon="confirmIcon"
      :label="confirmLabel"
      :variant="confirmVariant"
      :disabled="confirmDisabled"
      :loading="loading"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('confirm')"
    />
    <BButton
      :variant="cancelVariant"
      stop-propagation
      :disabled="cancelDisabled"
      :small="small"
      :icon="cancelIcon"
      :label="cancelLabel"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('cancel')"
    />
    <BButton
      v-if="!confirmFirst"
      :small="small"
      stop-propagation
      :icon="confirmIcon"
      :label="confirmLabel"
      :variant="confirmVariant"
      :disabled="confirmDisabled"
      :loading="loading"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('confirm')"
    />
  </BFlexbox>
</template>
