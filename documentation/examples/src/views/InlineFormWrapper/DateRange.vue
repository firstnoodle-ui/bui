<script setup lang="ts">
import { BButton, BFlexbox, BIcon, BPopCalendar } from "@firstnoodle-ui/bui";
import { ref } from "vue";

const { startDate, endDate } = defineProps<{
  startDate?: string;
  endDate?: string;
}>();

const emit = defineEmits<{
  (e: "update:startDate", date: string | Date | null): void;
  (e: "update:endDate", date: string | Date | null): void;
}>();

const startDateButton = ref<typeof BButton>();
const endDateButton = ref<typeof BButton>();
</script>

<template>
  <BFlexbox class="gap-1 px-2 py-2">
    <BPopCalendar
      clearable
      :value="startDate"
      @change="
        emit('update:startDate', $event);
        startDateButton?.$el.focus();
      "
    >
      <template #trigger="{ visible }">
        <BButton
          ref="startDateButton"
          small
          icon="calendar"
          variant="outlineSubtle"
          :focus="visible"
          :label="startDate || 'Start date'"
        />
      </template>
    </BPopCalendar>
    <BIcon name="arrow-right" class="text-tertiary" />
    <BPopCalendar
      clearable
      :value="endDate"
      @change="
        emit('update:endDate', $event);
        endDateButton?.$el.focus();
      "
    >
      <template #trigger>
        <BButton
          ref="endDateButton"
          small
          icon="calendar"
          variant="outlineSubtle"
          :label="endDate || 'End date'"
        />
      </template>
    </BPopCalendar>
  </BFlexbox>
</template>
