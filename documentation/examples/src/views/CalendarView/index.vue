<script setup lang="ts">
import { BCalendarView } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
} from "../../components";

const selectedDate = ref("2025-06-18");
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BCalendarView
        :value="selectedDate" @change="
          (newDate:string) => {
            selectedDate = newDate;
            print(`change: ${newDate}`);
          }
        "
      />
    </template>
    <template #controls />
  </ComponentPage>
</template>
