<script setup lang="ts">
import type { CalendarViewProps } from "./types.ts";
import type { CalendarGridItem } from "./utils/types.ts";
import { onMounted, onUnmounted, ref, toRef, watch } from "vue";
import { loopRange } from "../../utils/array.ts";
import { BButton } from "../button/index.ts";
import DecadeView from "./components/DecadeView.vue";
import MonthView from "./components/MonthView.vue";
import YearView from "./components/YearView.vue";
import { useCalendar, ViewType } from "./composables/useCalendar.ts";

import { Direction, Weekday } from "./utils/enums.ts";

const {
  value = null,
  clearable = false,
  weekStart = 1,
  disabledDates = [],
} = defineProps<CalendarViewProps>();

const emit = defineEmits<{
  (e: "change", date: Date | null): void;
}>();

const {
  viewData,
  viewType,
  viewMonth,
  viewYear,
  changeView,
  moveViewDate,
  moveRequest,
  setSelectedDate,
  setViewDateAndChangeView,
} = useCalendar(value, { weekStart, disabledDates });

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

  emit("change", date.date);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) {
    return;
  }

  event.preventDefault();

  switch (event.key) {
    case "ArrowUp":
      moveRequest(Direction.UP, true);
      break;
    case "ArrowDown":
      moveRequest(Direction.DOWN, true);
      break;
    case "ArrowLeft":
      moveRequest(Direction.LEFT, true);
      break;
    case "ArrowRight":
      moveRequest(Direction.RIGHT, true);
      break;
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
});
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
