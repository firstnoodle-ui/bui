<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { DateFormat, ReadableDateFormat } from "../calendar-view/utils/utils/format";
import { BButton } from "../button";
import { BCalendarView } from "../calendar-view";
import { BPopper, BPopperContent } from "../popper";

const { value = null, format = "date", disabled = false, clearable = false } = defineProps<{
  value?: string | Date | null;
  format?: DateFormat | ReadableDateFormat;
  clearable?: boolean;
  disabled?: boolean;
  placement?: Placement;
}>();

const emit = defineEmits(["change", "close", "open"]);
</script>

<template>
  <BPopper
    trigger="click"
    :placement="placement"
    :disabled="disabled"
    @close="emit('close')"
    @open="(targets:any[]) => emit('open', targets)"
  >
    <template #default="slotProps">
      <slot name="trigger" :visible="slotProps.visible" />
    </template>
    <template #content>
      <BPopperContent>
        <BCalendarView :value="value" :format="format" @change="emit('change', $event)" />
        <BButton v-if="clearable" label="Clear" @click="emit('change', null)" />
      </BPopperContent>
    </template>
  </BPopper>
</template>
