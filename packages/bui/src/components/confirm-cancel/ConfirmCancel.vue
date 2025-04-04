<script setup lang="ts">
import type { TButtonType, TIcon } from "../types";
import { computed } from "vue";
import { BButton, BFlexbox } from "../";

const props = withDefaults(
  defineProps<{
    alignment?: "left" | "right";
    cancelButtonIsText?: boolean;
    cancelDisabled?: boolean;
    cancelIcon?: TIcon;
    cancelLabel?: string;
    confirmDisabled?: boolean;
    confirmIcon?: TIcon;
    confirmLabel?: string;
    confirmType?: TButtonType;
    fillContainer?: boolean;
    loading?: boolean;
    small?: boolean;
  }>(),
  {
    alignment: "left",
    cancelButtonIsText: false,
    cancelDisabled: false,
    cancelLabel: "Cancel",
    confirmDisabled: false,
    confirmLabel: "Confirm",
    confirmType: "primary",
    fillContainer: false,
    loading: false,
    small: false,
  },
);

const emit = defineEmits(["confirm", "cancel"]);

const leftAligned = computed(() => props.alignment === "left");
</script>

<template>
  <BFlexbox class="gap-2">
    <BButton
      v-if="leftAligned"
      :small="small"
      solid
      stop-propagation
      :icon="confirmIcon"
      :label="confirmLabel"
      :type="confirmType"
      :disabled="confirmDisabled"
      :loading="loading"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('confirm')"
    />
    <BButton
      :bordered="!cancelButtonIsText"
      type="primary"
      stop-propagation
      :disabled="cancelDisabled"
      :small="small"
      :icon="cancelIcon"
      :label="cancelLabel"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('cancel')"
    />
    <BButton
      v-if="!leftAligned"
      :small="small"
      solid
      stop-propagation
      :icon="confirmIcon"
      :label="confirmLabel"
      :type="confirmType"
      :disabled="confirmDisabled"
      :loading="loading"
      :class="{ 'flex-1': fillContainer }"
      @click="emit('confirm')"
    />
  </BFlexbox>
</template>
