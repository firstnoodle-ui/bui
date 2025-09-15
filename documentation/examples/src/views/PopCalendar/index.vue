<script setup lang="ts">
import { BButton, BPopCalendar } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const selectedDate = ref<string | null>(null);
const onDateChange = (date:string|null) => selectedDate.value = date;
</script>

<template>
  <ComponentPage title="PopCalendar">
    <BPopCalendar :value="selectedDate" @change="onDateChange">
      <template #trigger="slotProps">
        <BButton small icon="calendar" :label="selectedDate || 'Select Date'" :focus="slotProps.visible" variant="outlineSubtle" />
      </template>
    </BPopCalendar>
  </ComponentPage>
</template>
