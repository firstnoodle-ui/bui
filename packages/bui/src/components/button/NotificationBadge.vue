<script setup lang="ts">
defineProps<{ inside?: boolean }>();
</script>

<template>
  <div
    class="absolute"
    :style="{
      top: inside ? '0.15em' : '-0.3em',
      right: inside ? '0.15em' : '-0.3em',
    }"
  >
    <div class="w-3 h-3 bg-orange-500 rounded-full border border-white dark:border-[var(--color-bg-primary)]" />
  </div>
</template>
