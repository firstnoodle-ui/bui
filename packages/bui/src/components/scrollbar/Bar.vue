<template>
  <div ref="scrollbarRef" :class="`scrollbar__bar is-${bar.key}`" @click.stop.prevent @mousedown.stop.prevent="onTrackClick">
    <div ref="thumbRef" :style="renderThumbStyle()" class="scrollbar__thumb" @click.stop.prevent @mousedown.stop.prevent="onThumbClick" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ThumbDragEvent } from "./types";
import { horizontalProperties, verticalProperties } from "./enums";

const props = defineProps({
  vertical: Boolean,
  size: String,
  move: Number
});

const emit = defineEmits(["update"]);

const scrollbarRef = ref<HTMLDivElement>();
const thumbRef = ref<HTMLDivElement>();
const dragging = ref(false);
const bar = props.vertical ? verticalProperties : horizontalProperties;
const position = ref(0);

const onThumbClick = (event: MouseEvent) => {
  // prevent click event of right button
  if (event.ctrlKey || event.button === 2) return;
  startDrag(event);

  if (event.currentTarget) {
    const offset: number = <number>(event.currentTarget as HTMLDivElement)[bar.offset as keyof HTMLDivElement];
    const axis: number = <number>event[bar.client as keyof MouseEvent];
    const rect: DOMRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    if (rect) {
      const side = rect[bar.direction as keyof DOMRect] as number;
      position.value = offset - (axis - side);
    }
  }
};

const onTrackClick = (event: MouseEvent) => {
  const rect = (event.target as HTMLDivElement).getBoundingClientRect();
  if (rect) {
    const offset = Math.abs(<number>rect[bar.direction as keyof DOMRect] - <number>event[bar.client as keyof MouseEvent]);
    const thumbHalf = <number>thumbRef.value![bar.offset as keyof HTMLDivElement] / 2;
    const thumbPositionPercentage = ((offset - thumbHalf) * 100) / <number>scrollbarRef.value![bar.offset as keyof HTMLDivElement];

    emit("update", {
      scrollReference: bar.scroll,
      positionPercentage: thumbPositionPercentage,
      scrollSize: bar.scrollSize
    } as unknown as ThumbDragEvent);
  }
};

const startDrag = (event: MouseEvent) => {
  event.stopImmediatePropagation();
  dragging.value = true;
  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("mouseup", onDocumentMouseUp);
  document.onselectstart = () => false;
};

const onDocumentMouseMove = (event: MouseEvent) => {
  if (!dragging.value) return;

  const prevPage = position.value;
  if (!prevPage) return;

  const rect = scrollbarRef.value!.getBoundingClientRect();
  if (rect) {
    const offset = (<number>rect[bar.direction as keyof DOMRect] - <number>event[bar.client as keyof MouseEvent]) * -1;
    const thumbClickPosition = <number>thumbRef.value![bar.offset as keyof HTMLDivElement] - prevPage;
    const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / <number>scrollbarRef.value![bar.offset as keyof HTMLDivElement];

    emit("update", {
      scrollReference: bar.scroll,
      positionPercentage: thumbPositionPercentage,
      scrollSize: bar.scrollSize
    } as unknown as ThumbDragEvent);
  }
};

const onDocumentMouseUp = () => {
  dragging.value = false;
  position.value = 0;
  document.removeEventListener("mousemove", onDocumentMouseMove);
  document.onselectstart = null;
};

const renderThumbStyle = () => {
  const translate = `translate${bar.axis}(${props.move}%)`;
  return {
    [bar.size]: props.size,
    transform: translate,
    msTransform: translate,
    webkitTransform: translate
  };
};
</script>
