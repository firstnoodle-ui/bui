<script setup lang="ts">
import { BInputNumber } from "@firstnoodle/bui";
import PropControlBase from "./PropControlBase.vue";

const { float = false, disabled = false } = defineProps<{ value: number; name: string; float?: boolean; disabled?: boolean }>();
defineEmits<{
  (e: "change", value: number): void;
}>();
</script>

<template>
  <PropControlBase type="Number" :name="name">
    <template #control>
      <BInputNumber :disabled="disabled" :float="float" :value="value" class="w-40" @change="(newValue:number) => $emit('change', newValue)" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
