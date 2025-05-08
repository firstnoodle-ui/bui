<template>
    <PropControlBase type="<T>">
        <template #control>
            <div class="text-secondary font-medium text-sm">{{ name }}</div>
            <BPopSelect
                :options="options"
                :selected="value"
                filterable
                @select="onSelect"
            >
                <template #trigger="{ visible }">
                    <BButton
                        :label="value.label"
                        :soft-focus="visible"
                        variant="outlineSubtle"
                        icon-after="chevron-down"
                    />
                </template>
            </BPopSelect>
        </template>
    </PropControlBase>
</template>

<script setup lang="ts">
import PropControlBase from './PropControlBase.vue';
import { BButton, BPopSelect, type TPopSelectOption } from '@firstnoodle/bui';
defineProps<{ value:TPopSelectOption; options:TPopSelectOption[], name:string }>();
const emit = defineEmits(['select']);
const onSelect = (option:TPopSelectOption) => emit('select', option);
</script>