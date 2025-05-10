<template>
    <section class="flex items-center gap-8 py-2 px-3 border-b border-default">
        <div class="w-1/3 flex items-center gap-2"><slot name="control"/></div>
        <div class="w-1/3 text-sm text-tertiary">{{ type }}</div>
        <div class="w-1/3 text-sm text-tertiary"><slot name="notes"/></div>
    </section>
</template>

<script setup lang="ts">
defineProps<{ type:string }>();
</script>