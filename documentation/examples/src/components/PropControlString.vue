<script setup lang="ts">
import { BInput } from "@firstnoodle/bui";
import PropControlBase from "./PropControlBase.vue";

defineProps<{ value: string; name: string }>();
defineEmits<{
  (e: "change", str: string): void;
}>();
</script>

<template>
  <PropControlBase type="String" :name="name">
    <template #control>
      <BInput class="w-full" :value="value" @change="(str:string) => $emit('change', str)" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
