<script setup lang="ts">
import { BPopper, BPopperContent } from "../popper";
import { BCalendarView } from "../calendar-view";
import { type DateFormat } from "../calendar-view/utils/utils/format";
import type { Placement } from "@floating-ui/dom";

const emit = defineEmits(['change', 'close', 'open']);

const { value = null, format = 'date', disabled = false, clearable = false } = defineProps<{
  value: string|Date|null;
  format?: DateFormat;
  clearable?: boolean;
  disabled?: boolean;
  placement?: Placement, 
}>();

</script>

<template>
  <BPopper
    ref="popperRef"
    trigger="click"
    :placement="placement"
    @close="emit('close')"
    @open="(targets:any[]) => emit('open', targets)"
  >
    <template #default="slotProps">
      <slot name="trigger" :visible="slotProps.visible" />
    </template>
    <template #content>
      <BPopperContent ref="popperContentRef">
        <BCalendarView :value="value" @change="emit('change', $event)" />
      </BPopperContent>
    </template>
  </BPopper>
</template>