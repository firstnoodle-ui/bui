<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="py-1 min-w-0 leading-0 truncate">
    {{ label }}
  </div>
</template>
