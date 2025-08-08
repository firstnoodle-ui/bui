<script setup lang="ts">
import type { CalendarGridItem } from "../utils/types";
import { capitalizeFirstLetter } from "../../../utils/capitalizeFirstLetter";
import { BButton } from "../../button";
import { TimeUnit } from "../utils/utils/time";
import DateButton from "./DateButton.vue";

defineProps<{
  viewData: CalendarGridItem[];
  currentMonth: string;
  currentYear: number;
  weekdays: string[];
}>();

const emit = defineEmits(["move", "change-view", "select"]);
</script>

<template>
  <div>
    <nav class="w-56 grid grid-cols-7">
      <BButton
        variant="textSubtle"
        icon="chevron-left-double"
        @click="emit('move', { amount: -1, unit: TimeUnit.YEAR })"
      />
      <BButton
        variant="textSubtle"
        icon="chevron-left"
        @click="emit('move', { amount: -1, unit: TimeUnit.MONTH })"
      />
      <div class="col-span-3 h-8 flex items-center justify-center">
        <BButton
          variant="textSubtle"
          :label="capitalizeFirstLetter(currentMonth.slice(0, 3))"
          @click="emit('change-view', TimeUnit.YEAR)"
        />
        <BButton
          variant="textSubtle"
          :label="currentYear.toString()"
          @click="emit('change-view', TimeUnit.DECADE)"
        />
      </div>
      <BButton
        variant="textSubtle"
        icon="chevron-right"
        @click="emit('move', { amount: 1, unit: TimeUnit.MONTH })"
      />
      <BButton
        variant="textSubtle"
        icon="chevron-right-double"
        @click="emit('move', { amount: 1, unit: TimeUnit.YEAR })"
      />
    </nav>
    <header class="w-56 grid grid-cols-7 bg-bg-medium rounded my-2">
      <div
        v-for="day in weekdays"
        :key="day"
        class="flex items-center justify-center w-8 h-6 text-muted text-xs select-none"
      >
        {{ day.slice(0, 1).toUpperCase() }}
      </div>
    </header>
    <main class="w-56 grid grid-cols-7">
      <DateButton
        v-for="dateItem in viewData"
        :key="dateItem.date"
        :date="dateItem"
        @click="emit('select', dateItem)"
      />
    </main>
  </div>
</template>
