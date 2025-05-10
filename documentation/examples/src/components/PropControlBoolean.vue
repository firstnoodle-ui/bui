<template>
    <PropControlBase type="Boolean">
        <template #control>
            <BSwitch small off-color-class="bg-tertiary" on-color-class="bg-action" :value="value" @toggle="$emit('toggle')" />
            <div class="text-secondary font-medium text-sm">{{ name }}</div>
        </template>
        <template #notes><slot/></template>
    </PropControlBase>
</template>

<script setup lang="ts">
import PropControlBase from './PropControlBase.vue';
import { BSwitch } from '@firstnoodle/bui';
defineProps<{ value:boolean; name:string }>();
</script>