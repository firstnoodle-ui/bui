<script setup lang="ts">
import { BIcon } from "@firstnoodle/bui";
</script>

<template>
  <section class="py-2">
    <section class="flex items-center justify-end gap-2 px-3 py-2">
      <div class="flex items-center gap-1">
        <BIcon name="lightning" />
        <span class="">Events</span>
      </div>
      <div class="flex items-center gap-2">
        <slot />
      </div>
    </section>
  </section>
</template>
