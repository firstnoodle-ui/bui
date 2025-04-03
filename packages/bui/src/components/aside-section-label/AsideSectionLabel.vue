<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <section class="w-full space-y-4">
    <div class="w-full h-12 flex items-center">
      <p class="flex-none pr-2 text-xs leading-none font-medium text-secondary">
        {{ label }}
      </p>
      <div class="flex-1 h-full">
        <div class="w-full border-b border-default" style="height: 54%" />
      </div>
    </div>
  </section>
</template>
