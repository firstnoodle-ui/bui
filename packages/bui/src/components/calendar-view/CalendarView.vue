<script setup lang="ts">
import type { CalendarGridItem } from "./utils/types.ts";
import type { DateFormat } from "./utils/utils/format.ts";
import { ref, toRef, watch } from "vue";
import { loopRange } from "../../utils/array.ts";
import { BButton } from "../button/index.ts";
import DecadeView from "./components/DecadeView.vue";
import MonthView from "./components/MonthView.vue";
import YearView from "./components/YearView.vue";
import { useCalendar, ViewType } from "./composables/useCalendar.ts";

import { Weekday } from "./utils/enums.ts";
import { formatDate } from "./utils/utils/format.ts";

const {
  value = null,
  clearable = false,
  format = "readableDateWithDay",
  weekStart = 1,
  disabledDates = [],
} = defineProps<{
  value?: string | Date | null;
  clearable?: boolean;
  type?: DateFormat;
  format?: DateFormat;
  weekStart?: number;
  disabledDates?: ((date: Date) => boolean)[];
}>();

const emit = defineEmits<{
  (e: "change", date: string|null): void
}>();

const {
  viewData,
  viewType,
  viewMonth,
  viewYear,
  changeView,
  moveViewDate,
  setSelectedDate,
  setViewDateAndChangeView,
} = useCalendar(value, { weekStart: weekStart, disabledDates: disabledDates });

watch(() => value, newValue => setSelectedDate(newValue));

const currentMonth = toRef(viewMonth);

// 'rotate' the weekdays to start on the weekStart day
const weekdays = ref(Object.values(Weekday).map((_day, index) => {
  return Object.values(Weekday)[
    loopRange(index + weekStart, Object.values(Weekday).length)
  ];
}));

const onDateClick = (date: CalendarGridItem | null) => {
  if (!date) {
    emit("change", null);
    return;
  }

  if (date.disabled) return;
  if (!date.date) return;

  const dateFn = formatDate[format];
  if(!dateFn) throw new Error(`dateFn for ${format} not found`);
  emit("change", dateFn(date.date));
};
</script>

<template>
  <section class="flex flex-col">
    <main class="p-4">
      <MonthView
        v-if="viewType === ViewType.MONTH"
        :current-month="currentMonth"
        :current-year="viewYear"
        :view-data="viewData"
        :weekdays="weekdays"
        @move="moveViewDate"
        @change-view="changeView"
        @select="onDateClick"
      />
      <YearView
        v-if="viewType === ViewType.YEAR"
        :current-year="viewYear"
        :view-data="viewData"
        @move="moveViewDate"
        @select="setViewDateAndChangeView"
      />
      <DecadeView
        v-if="viewType === ViewType.DECADE"
        :view-data="viewData"
        @move="moveViewDate"
        @select="setViewDateAndChangeView"
      />
    </main>
    <footer v-if="clearable" class="flex items-center justify-end p-4 border-t border-default">
      <BButton
        square
        size="tiny"
        variant="outlineSubtle"
        leading-icon="trash"
        label="Clear"
        :disabled="!value"
        @click="onDateClick(null)"
      />
    </footer>
  </section>
</template>
