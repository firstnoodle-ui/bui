<template>
    <div>
        <nav class="w-56 grid grid-cols-7">
            <BButton
                icon="chevron-left"
                variant="textSubtle"
                @click="emit('move', { amount: -1, unit: 'YEAR'})"
            />
            <div
                class="col-span-5 text-sm flex justify-center items-center"
            >
                {{ currentYear }}
            </div>
            <BButton
                icon="chevron-right"
                variant="textSubtle"
                @click="emit('move', { amount: 1, unit: 'YEAR'})"
            />
        </nav>
        <main class="w-56 grid grid-cols-2 py-4">
            <BButton
                v-for="(month, monthIndex) in viewData"
                :key="month.label"
                :variant="month.selected ? 'fill' : (month.current ? 'text' : 'textSubtle')"
                :label="capitalizeFirstLetter(month.label.toString())"
                @click="
                    emit(
                        'select',
                        {
                            value: monthIndex,
                            unit: TimeUnit.MONTH,
                            view: TimeUnit.MONTH
                        }
                    )
                "
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import NavButton from './NavButton.vue';
import { BButton } from '../../button';
import { type CalendarGridItem } from '../utils/types';
import { TimeUnit } from '../utils/utils/time';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

const emit = defineEmits(['move', 'select']);
defineProps<{
    viewData: CalendarGridItem[],
    currentYear: number
}>();
</script>