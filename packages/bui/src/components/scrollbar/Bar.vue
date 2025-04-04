<script setup lang="ts">
import type { ThumbDragEvent } from "./types";
import { ref } from "vue";
import { horizontalProperties, verticalProperties } from "./enums";

const props = defineProps<{
  vertical: boolean;
  size: string;
  move: number;
}>();

const emit = defineEmits(["update"]);

const scrollbarRef = ref<HTMLDivElement>();
const thumbRef = ref<HTMLDivElement>();
const dragging = ref(false);
const bar = props.vertical ? verticalProperties : horizontalProperties;
const position = ref(0);

const onDocumentMouseMove = (event: MouseEvent) => {
  if (!dragging.value) return;

  const prevPage = position.value;
  if (!prevPage) return;

  const rect = scrollbarRef.value!.getBoundingClientRect();
  if (rect) {
    const offset = ((rect[bar.direction as keyof DOMRect] as number || 0) - (event[bar.client as keyof MouseEvent] as number || 0)) * -1;
    const thumbClickPosition = thumbRef.value && typeof thumbRef.value[bar.offset as keyof HTMLDivElement] === "number"
      ? (thumbRef.value[bar.offset as keyof HTMLDivElement] as number) - prevPage
      : 0;
    const scrollbarOffset = scrollbarRef.value ? Number(scrollbarRef.value[bar.offset as keyof HTMLDivElement]) : 0;
    const thumbPositionPercentage = scrollbarOffset ? ((offset - thumbClickPosition) * 100) / scrollbarOffset : 0;

    emit("update", {
      scrollReference: bar.scroll,
      positionPercentage: thumbPositionPercentage,
      scrollSize: bar.scrollSize,
    } as unknown as ThumbDragEvent);
  }
};

const onDocumentMouseUp = () => {
  dragging.value = false;
  position.value = 0;
  document.removeEventListener("mousemove", onDocumentMouseMove);
  document.onselectstart = null;
};

const startDrag = (event: MouseEvent) => {
  event.stopImmediatePropagation();
  dragging.value = true;
  document.addEventListener("mousemove", onDocumentMouseMove);
  document.addEventListener("mouseup", onDocumentMouseUp);
  document.onselectstart = () => false;
};

const onThumbClick = (event: MouseEvent) => {
  // prevent click event of right button
  if (event.ctrlKey || event.button === 2) return;
  startDrag(event);

  if (event.currentTarget) {

    const offset: number = (event.currentTarget as HTMLDivElement)[bar.offset as keyof HTMLDivElement] as number;
    const axis: number = event[bar.client as keyof MouseEvent] as number;
    const rect: DOMRect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
    const side = rect[bar.direction as keyof DOMRect] as unknown as number;
    position.value = offset - (axis - side);
  }
};

const onTrackClick = (event: MouseEvent) => {
  const rect = (event.target as HTMLDivElement).getBoundingClientRect();
  if (rect) {
    const rectDirection = rect[bar.direction as keyof DOMRect];
    const eventClient = event[bar.client as keyof MouseEvent];
    const offset = Math.abs((rectDirection ? Number(rectDirection) : 0) - (eventClient ? Number(eventClient) : 0));
    const thumbHalf = thumbRef.value![bar.offset as keyof HTMLDivElement] as number / 2;
    const scrollbarOffset = scrollbarRef.value ? Number(scrollbarRef.value[bar.offset as keyof HTMLDivElement]) : 0;
    const thumbPositionPercentage = scrollbarOffset ? ((offset - thumbHalf) * 100) / scrollbarOffset : 0;

    emit("update", {
      scrollReference: bar.scroll,
      positionPercentage: thumbPositionPercentage,
      scrollSize: bar.scrollSize,
    } as unknown as ThumbDragEvent);
  }
};

const renderThumbStyle = () => {
  const translate = `translate${bar.axis}(${props.move}%)`;
  return {
    [bar.size]: props.size,
    transform: translate,
    msTransform: translate,
    webkitTransform: translate,
  };
};
</script>

<template>
  <div ref="scrollbarRef" :class="`scrollbar__bar is-${bar.key}`" @click.stop.prevent @mousedown.stop.prevent="onTrackClick">
    <div ref="thumbRef" :style="renderThumbStyle()" class="scrollbar__thumb" @click.stop.prevent @mousedown.stop.prevent="onThumbClick" />
  </div>
</template>
