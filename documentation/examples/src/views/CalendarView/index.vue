<script setup lang="ts">
import { BCalendarView, formatDate } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
} from "../../components";

const selectedDate = ref<Date | null>(new Date());
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BCalendarView
        :value="selectedDate"
        @change="
          (newDate:Date|null) => {
            selectedDate = newDate;
            print(`change: ${newDate ? formatDate.readableDateWithDay(newDate) : 'null'}`);
          }
        "
      />
    </template>
    <template #controls />
  </ComponentPage>
</template>
