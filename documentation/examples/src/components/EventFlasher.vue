<script setup lang="ts">
import { ref } from "vue";

defineProps<{ name: string }>();

const active = ref(false);

defineExpose({ flash: (payload: any) => {
  active.value = true;
  setTimeout(() => {
    active.value = false;
  }, 100);
} });
</script>

<template>
  <div
    class="inline-flex items-center gap-1 p-1 h-6 rounded-sm border transition-all"
    :class="{
      'bg-purple-400 text-white duration-75': active,
      'bg-white text-purple-700 border-purple-500 duration-200': !active,
    }"
  >
    <div class="">
      @{{ name }}
    </div>
  </div>
</template>
