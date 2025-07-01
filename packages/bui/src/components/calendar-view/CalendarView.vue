<template>
    <section class="flex flex-col">
        <main class="p-4">
            <month-view
                v-if="viewType === ViewType.MONTH"
                :current-month="currentMonth"
                :current-year="viewYear"
                :view-data="viewData"
                :weekdays="weekdays"
                @move="moveViewDate"
                @change-view="changeView"
                @select="onDateClick"
            />
            <year-view
                v-if="viewType === ViewType.YEAR"
                :current-year="viewYear"
                :view-data="viewData"
                @move="moveViewDate"
                @select="setViewDateAndChangeView"
            />
            <decade-view
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
                :label="'Clear'"
                :disabled="!value"
                @click="onDateClick(null)"
            />
        </footer>
    </section>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
import { BButton } from '../button/index.ts';
import { loopRange } from '../../utils/array.ts';
import { Weekday } from './utils/enums.ts';
import DecadeView from './components/DecadeView.vue';
import MonthView from './components/MonthView.vue';
import YearView from './components/YearView.vue';
import { useCalendar } from './composables/useCalendar.ts';
import { ViewType } from './composables/useCalendar.ts';
import { type CalendarGridItem } from './utils/types.ts';
import { formatDate, type ReadableDateFormat } from './utils/utils/format.ts';

const emit = defineEmits(['change'])

const props = withDefaults(defineProps<{
    value?: string|Date|null,
    clearable?: boolean,
    type?: 'date'|'datetime',
    format?: ReadableDateFormat,
    weekStart?: number,
    disabledDates?: Function[],
}>(), {
    value: null,
    clearable: false,
    type: 'date',
    format: 'readableDateWithDay',
    weekStart: 1,
})

const {
    viewData,
    viewType,
    viewMonth,
    viewYear,
    changeView,
    moveViewDate,
    setSelectedDate,
    setViewDateAndChangeView,
} = useCalendar(props.value, { weekStart: props.weekStart, disabledDates: props.disabledDates })

watch(() => props.value, (newValue) => setSelectedDate(newValue)) 

const currentMonth = toRef(viewMonth)

// 'rotate' the weekdays to start on the weekStart day
const weekdays = ref(Object.values(Weekday).map((_day, index) => {
    return Object.values(Weekday)[
        loopRange(index + props.weekStart, Object.values(Weekday).length)
    ]
}))

const onDateClick = (date:CalendarGridItem|null) => {
    if(!date) {
        emit('change', null)
        return
    }

    if(date.disabled) return
    if(!date.date) return 

    emit('change', formatDate[props.format](date.date))
}
</script>