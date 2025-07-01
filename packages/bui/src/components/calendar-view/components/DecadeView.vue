<template>
    <div>
        <nav class="w-56 grid grid-cols-7">
            <BButton
                icon="chevron-left"
                variant="textSubtle"
                @click="emit('move', {amount: -10, unit: TimeUnit.YEAR})"
            />
            <div class="col-span-5 flex items-center justify-center text-sm">
                {{ label }}
            </div>
            <BButton
                icon="chevron-right"
                variant="textSubtle"
                @click="emit('move', { amount: 10, unit: TimeUnit.YEAR})"
            />
        </nav>
        <main class="w-56 grid grid-cols-2 py-8">
            <BButton
                v-for="year in viewData"
                :key="year.label"
                :variant="year.selected ? 'fill' : (year.current ? 'text' : 'textSubtle')"
                :label="year.label.toString()"
                @mouseup.stop="
                    emit(
                        'select',
                        {
                            value: year.label,
                            unit: TimeUnit.YEAR,
                            view: TimeUnit.MONTH
                        }
                    )
                "
            />
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NavButton from './NavButton.vue';
import { BButton } from '../../button';
import { type CalendarGridItem } from '../utils/types';
import { TimeUnit } from '../utils/utils/time';

const emit = defineEmits(['move', 'select'])
const props = defineProps<{viewData: CalendarGridItem[]}>()
const label = computed(() => {
    return `${props.viewData[0].label} - ${props.viewData[props.viewData.length - 1].label}`
})
</script>