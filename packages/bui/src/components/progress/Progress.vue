<script setup lang="ts">
import { computed } from "vue";
import { BIcon } from "../icon";

const { percentage = 0 } = defineProps<{
  percentage?: number;
  prefix?: string;
}>();

const complete = computed(() => percentage >= 100);
</script>

<template>
  <div class="relative bg-tertiary overflow-hidden">
    <div
      class="absolute inset-y-0 left-0 transition-all duration-300 ease-out"
      :class="{
        'animate-pulse': percentage < 100,
        'bg-action': !complete,
        'bg-green-600': complete,
      }"
      :style="{ width: `${Math.min(100, Math.max(0, percentage))}%` }"
    />
    <div class="absolute inset-0 flex items-center justify-center">
      <div v-if="!complete" class="flex items-center gap-1">
        <span v-if="prefix">{{ prefix }}</span>
        <span>{{ Math.round(percentage) }}%</span>
      </div>
      <div v-else class="flex items-center gap-1">
        <BIcon name="check" />
        <!-- <span>Done</span> -->
      </div>
    </div>
  </div>
</template>
