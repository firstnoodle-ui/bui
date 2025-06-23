<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="min-w-0 truncate">
    {{ label }}
  </div>
</template>
