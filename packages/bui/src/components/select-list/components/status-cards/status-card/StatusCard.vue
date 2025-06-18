<template>
    <div class="flex-1 h-full flex flex-col items-center justify-center gap-2">
        <div class="flex flex-col items-center justify-center">
            <div class="flex items-center justify-center w-12 h-12">
                <slot />
            </div>
        </div>
        <span
            class="text-ui-label-14-medium"
            :class="{
                'text-disabled-font': variant === 'idle' || variant === 'no match',
                'text-alert': variant === 'error',
                'text-primary': variant === 'loading',
            }"
        >
            {{ status }}
        </span>
    </div>
</template>

<script setup lang="ts">
import type { SelectListState } from "../../../types";
defineProps<{ status: string, variant: SelectListState }>();
</script>