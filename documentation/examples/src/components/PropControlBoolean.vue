<script setup lang="ts">
import { BSwitch } from "@firstnoodle-ui/bui";
import PropControlBase from "./PropControlBase.vue";

defineProps<{ value: boolean; name: string }>();
defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<template>
  <PropControlBase type="Boolean" :name="name">
    <template #control>
      <BSwitch small on-color-class="bg-action" :value="value" @toggle="$emit('toggle')" />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
