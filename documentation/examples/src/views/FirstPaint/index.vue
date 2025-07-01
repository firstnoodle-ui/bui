<script setup lang="ts">
import { BFirstPaint } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage title="First paint">
    <section class="space-y-2">
      <BFirstPaint :delay-index="1" class="w-full" />
      <BFirstPaint :delay-index="2" class="w-3/4" />
      <BFirstPaint :delay-index="3" class="w-1/2" />
      <BFirstPaint :delay-index="4" class="w-1/4" />
    </section>
  </ComponentPage>
</template>
