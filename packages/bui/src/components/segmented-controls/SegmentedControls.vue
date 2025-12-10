<script setup lang="ts">
import { type Segment } from './types';
import { BFlexbox } from '../flexbox';
import SegmentButton from './SegmentButton.vue';


const { selectedSegment } = defineProps<{
  segments: Segment[];
  selectedSegment: Segment;
}>();

const emit = defineEmits<{
  (e: "select", segment: Segment): void
}>();

const getSegmentActiveState = (segment:Segment) => segment.label === selectedSegment.label;
</script>

<template>
  <BFlexbox class="gap-0.5 p-1 rounded-lg bg-secondary">
    <SegmentButton
      v-for="segment in segments"
      :key="segment.label"
      :segment="segment"
      :active="getSegmentActiveState(segment)"
      @click="emit('select', segment)"
    />
  </BFlexbox>
</template>
