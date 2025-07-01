<template>
    <BButton
        :icon="icon"
        @click="emit('click')"
        variant="textSubtle"
    />
</template>

<script setup lang="ts">
import { BIcon } from '../../icon';
import { BButton } from '../../button';
import { type TIcon } from '../../types';

const emit = defineEmits(['click'])

defineProps<{ icon:TIcon }>()
</script>
