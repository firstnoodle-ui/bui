<script setup lang="ts">
import { BButton, BPopCalendar } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const selectedDate = ref<Date | null>(null);
</script>

<template>
  <ComponentPage title="PopCalendar">
    <BPopCalendar :value="selectedDate" @change="selectedDate = $event">
      <template #trigger="slotProps">
        <BButton label="Select Date" :focus="slotProps.visible" />
      </template>
    </BPopCalendar>
  </ComponentPage>
</template>
