<script setup lang="ts">
import type { Placement } from "@floating-ui/dom";
import type { CalendarViewProps } from "../calendar-view/types";
import { ref } from "vue";
import { BButton } from "../button";
import { BCalendarView } from "../calendar-view";
import { BPopper, BPopperContent } from "../popper";

type PopCalendarProps = {
  mode?: "immediate" | "confirmation";
  disabled?: boolean;
  placement?: Placement;
} & CalendarViewProps;

const { value = null, format = "readableDate", disabled = false, clearable = false, mode = "immediate" } = defineProps<PopCalendarProps>();

const emit = defineEmits<{
  (e: "change", value: Date | null): void;
  (e: "close"): void;
  (e: "open", targets: HTMLElement[]): void;
}>();

const popperRef = ref<typeof BPopper>();
const selectedDate = ref< Date | null>(null);

const onChange = (date: Date | null) => {
  if (mode === "immediate") {
    // Immediate mode: emit change and close popper
    emit("change", date);
    popperRef.value?.close();
  }
  else {
    // Confirmation mode: store selected date, don't emit yet
    selectedDate.value = date;
  }
};

const onConfirm = () => {
  // Emit the selected date and close popper
  emit("change", selectedDate.value);
  popperRef.value?.close();
};

const onClear = () => {
  if (mode === "immediate") {
    emit("change", null);
    popperRef.value?.close();
  }
  else {
    selectedDate.value = null;
  }
};

const onOpen = (targets: HTMLElement[]) => {
  // Initialize selectedDate with current value when opening in confirmation mode
  if (mode === "confirmation") {
    selectedDate.value = value;
  }
  emit("open", targets);
};
</script>

<template>
  <BPopper
    ref="popperRef"
    trigger="click"
    :placement="placement"
    :disabled="disabled"
    @close="emit('close')"
    @open="onOpen"
  >
    <template #default="slotProps">
      <slot name="trigger" :visible="slotProps.visible" />
    </template>
    <template #content>
      <BPopperContent>
        <BCalendarView
          :value="mode === 'confirmation' ? selectedDate : value"
          :format="format"
          :disabled-dates="disabledDates"
          @change="onChange"
        />
        <footer v-if="mode === 'confirmation' || clearable" class="flex items-center justify-between px-4 pb-4">
          <BButton
            v-if="clearable"
            icon="trash"
            label="Clear"
            variant="outlineSubtle"
            @click="onClear"
          />
          <BButton
            v-if="mode === 'confirmation'"
            icon="check"
            label="Done"
            variant="fill"
            @click="onConfirm"
          />
        </footer>
      </BPopperContent>
    </template>
  </BPopper>
</template>
