<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="py-1 min-w-0 leading-none truncate">
    {{ label }}
  </div>
</template>
