<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<template>
    <section class="relative w-full border-t border-default py-4" :class="{ 'first:border-t-0 first:pt-0': !label }">
        <div v-if="label" style="top: -0.63rem" class="absolute bg-primary px-2 text-xs font-medium text-tertiary">{{ label }}</div>
        <slot />
    </section>
</template>