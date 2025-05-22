<script setup lang="ts">
import { BInputNumber } from "@firstnoodle/bui";
import PropControlBase from "./PropControlBase.vue";

defineProps<{ value: number; name: string }>();
defineEmits<{
  (e: "change", value: number): void;
}>();
</script>

<template>
  <PropControlBase type="Number">
    <template #control>
      <div class="text-secondary font-medium text-sm">
        {{ name }}
      </div>
      <BInputNumber :value="value" @change="(newValue:number) => $emit('change', newValue)" class="w-20" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
