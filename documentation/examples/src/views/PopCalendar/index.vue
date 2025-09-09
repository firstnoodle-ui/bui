<script setup lang="ts">
import { ref } from 'vue';
import { BButton, BPopCalendar } from '@firstnoodle-ui/bui';
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