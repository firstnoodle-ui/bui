<script setup lang="ts">
import { computed, ref } from "vue";
import { clamp } from "../../utils";

const props = withDefaults(
  defineProps<{
    width?: number;
    border?: boolean;
    draggable?: boolean;
    side?: "left" | "right";
    maxWidth?: number;
    minWidth?: number;
  }>(),
  {
    border: false,
    draggable: false,
    side: "left",
    maxWidth: 1000,
    minWidth: 160,
    width: 256,
  },
);

const emit = defineEmits(["resize-start", "resize", "resize-end"]);

const aside = ref<HTMLElement>();
const classes = computed(() => [
  props.side === "left" ? "left-0" : "right-0",
  props.border ? (props.side === "left" ? "border-r border-default" : "border-l border-default") : "",
]);

let startX: number;
let startWidth: number;
const dragging = ref(false);

function startDrag(event: MouseEvent) {
  startX = event.pageX;
  startWidth = props.width;
  dragging.value = true;
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("mousemove", onDrag);
  emit("resize-start");
}

function onDrag(event: MouseEvent) {
  const deltaX = props.side === "left" ? event.pageX - startX : startX - event.pageX;

  const dragTo = startWidth + deltaX;
  const result = clamp(dragTo, props.minWidth, props.maxWidth);

  if (result !== props.width) {
    emit("resize", result);
  }
}

function endDrag() {
  dragging.value = false;
  window.removeEventListener("mouseup", endDrag);
  window.removeEventListener("mousemove", onDrag);
  emit("resize-end");
}

function onKeyDown(event: KeyboardEvent) {
  const resizeStep = 30; // pixels to resize per arrow key press
  let newWidth = props.width;

  if (props.side === "left") {
    if (event.key === "ArrowLeft") {
      newWidth = props.width - resizeStep;
    }
    else if (event.key === "ArrowRight") {
      newWidth = props.width + resizeStep;
    }
  }
  else { // side === "right"
    if (event.key === "ArrowLeft") {
      newWidth = props.width + resizeStep;
    }
    else if (event.key === "ArrowRight") {
      newWidth = props.width - resizeStep;
    }
  }

  if (newWidth !== props.width) {
    event.preventDefault();
    const clampedWidth = clamp(newWidth, props.minWidth, props.maxWidth);
    if (clampedWidth !== props.width) {
      emit("resize", clampedWidth);
    }
  }
}
</script>

<template>
  <aside
    ref="aside"
    tabindex="0"
    :style="{
      width: `${width}px`,
      transitionProperty: dragging ? 'none' : 'transform, width',
    }"
    class="absolute top-0 z-10 h-full overflow-x-hidden bg-primary"
    :class="classes"
  >
    <slot />
    <button
      v-if="props.draggable"
      tabindex="0"
      :aria-label="`Resize ${props.side} panel`"
      class="absolute top-0 h-full w-1 hover:border-action cursor-ew-resize"
      :class="[
        props.side === 'left' ? 'right-0 border-r' : 'left-0 border-l',
        dragging ? 'border-action bg-action' : 'border-transparent bg-transparent hover:bg-tertiary focus:outline-none focus:border-action focus:bg-tertiary',
      ]"
      @mousedown="startDrag"
      @keydown="onKeyDown"
    />
  </aside>
</template>
