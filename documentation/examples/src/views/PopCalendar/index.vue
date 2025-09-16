<script setup lang="ts">
import type { DateFormat } from "@firstnoodle-ui/bui";
import type { Placement } from "@floating-ui/dom";
import { BButton, BPopCalendar, dateFormat, dateIsAfter } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
} from "../../components";

const selectedDate = ref<string | Date | null>(null);

// PropControl state
const format = ref<DateFormat>("readableDate");
const mode = ref<"immediate" | "confirmation">("immediate");
const placement = ref<Placement>("bottom");
const clearable = ref(true);
const disabled = ref(false);

const disabledDates = [
  (date: Date) => dateIsAfter("2025-09-11", date),
];

const modeOptions = ["immediate", "confirmation"];
const placementOptions = ["top", "bottom", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end", "left-start", "left-end", "right-start", "right-end"];

const onDateChange = (date: string | Date | null) => selectedDate.value = date;
</script>

<template>
  <ComponentPage title="PopCalendar">
    <template #default="{ print }">
      <BPopCalendar
        :value="selectedDate"
        :format="format"
        :mode="mode"
        :placement="placement"
        :clearable="clearable"
        :disabled="disabled"
        :disabled-dates="disabledDates"
        @change="
          onDateChange($event);
          print(`Date changed to: ${$event}`)
        "
        @open="print('PopCalendar opened')"
        @close="print('PopCalendar closed')"
      >
        <template #trigger="slotProps">
          <BButton
            small
            icon="calendar"
            :label="selectedDate || 'Select Date'"
            :focus="slotProps.visible"
            :disabled="disabled"
            variant="outlineSubtle"
          />
        </template>
      </BPopCalendar>
    </template>
    <template #controls>
      <PropControlSelect name="Format" :value="format" :options="[...dateFormat]" @select="(option: DateFormat) => format = option">
        Date format for the selected value
      </PropControlSelect>
      <PropControlSelect name="Mode" :value="mode" :options="modeOptions" @select="(option: 'immediate' | 'confirmation') => mode = option">
        Immediate: date emitted on click. Confirmation: requires Done button
      </PropControlSelect>
      <PropControlSelect name="Placement" :value="placement" :options="placementOptions" @select="(option: Placement) => placement = option">
        Position of the calendar popover
      </PropControlSelect>
      <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable">
        Show clear button in footer
      </PropControlBoolean>
      <PropControlBoolean name="Disabled" :value="disabled" @toggle="disabled = !disabled">
        Disable the calendar trigger
      </PropControlBoolean>
    </template>
  </ComponentPage>
</template>
