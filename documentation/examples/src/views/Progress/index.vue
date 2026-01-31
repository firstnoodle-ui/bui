<script setup lang="ts">
import { BProgress } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import { ComponentPage, PropControlNumber } from "../../components";

const percentage = ref(50);
</script>

<template>
  <ComponentPage>
    <div class="h-8 w-full rounded overflow-hidden">
      <section class="flex items-center gap-2">
        <span class="text-xs text-secondary">Processing</span>
        <BProgress :percentage="percentage" class="w-16 h-4 rounded-full text-xs" />
      </section>
    </div>
    <template #controls>
      <PropControlNumber name="percentage" :value="percentage" @change="(value: number) => percentage = value">
        0-100
      </PropControlNumber>
    </template>
  </ComponentPage>
</template>
