<script setup lang="ts">
import { BInputNumber } from "@firstnoodle/bui";
import PropControlBase from "./PropControlBase.vue";

defineProps<{ value: number; name: string }>();
defineEmits<{
  (e: "change", value: number): void;
}>();
</script>

<template>
  <PropControlBase type="Number" :name="name">
    <template #control>
      <BInputNumber :value="value" @change="(newValue:number) => $emit('change', newValue)" class="w-40" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
