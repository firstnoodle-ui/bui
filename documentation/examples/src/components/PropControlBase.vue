<script setup lang="ts">
defineProps<{ name:string, type: string }>();
</script>

<template>
  <section class="flex items-center gap-8 py-2 px-3 border-b border-default">
    <div class="w-1/5 text-sm truncate">
      {{ name }}
    </div>
    <div class="w-1/5 flex items-center gap-2">
      <slot name="control" />
    </div>
    <div class="w-1/5 text-sm text-tertiary">
      {{ type }}
    </div>
    <div class="w-2/5 text-sm text-tertiary">
      <slot name="notes" />
    </div>
  </section>
</template>
