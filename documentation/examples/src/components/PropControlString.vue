<template>
    <PropControlBase type="String">
        <template #control>
            <div class="text-secondary font-medium text-sm">{{ name }}</div>
            <BInput :value="value" @change="(str:string) => $emit('change', str)" />
        </template>
        <template #notes><slot/></template>
    </PropControlBase>
</template>

<script setup lang="ts">
import PropControlBase from './PropControlBase.vue';
import { BInput } from '@firstnoodle/bui';
defineProps<{ value:string; name:string }>();
</script>