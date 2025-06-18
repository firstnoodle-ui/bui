<script setup lang="ts">
defineProps<{ label?: string }>();
</script>

<template>
    <section class="">
        <div class="">
            <label v-if="label" class="">{{ label }}</label>
            <div class=""/>
        </div>
        <slot />
    </section>
</template>