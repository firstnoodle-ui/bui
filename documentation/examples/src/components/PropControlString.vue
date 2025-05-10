<script setup lang="ts">
import { BInput } from "@firstnoodle/bui";
import PropControlBase from "./PropControlBase.vue";

defineProps<{ value: string; name: string }>();
defineEmits<{
  (e: "change", str: string): void;
}>();
</script>

<template>
  <PropControlBase type="String">
    <template #control>
      <div class="text-secondary font-medium text-sm">
        {{ name }}
      </div>
      <BInput :value="value" @change="(str:string) => $emit('change', str)" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
