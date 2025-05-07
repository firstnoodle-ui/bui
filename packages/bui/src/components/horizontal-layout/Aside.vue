<script setup lang="ts">
import { computed, ref } from "vue";
import { clamp } from "../../utils";

const props = withDefaults(
  defineProps<{
    width?: number;
    border?: boolean;
    draggable?: boolean;
    visible?: boolean;
    side?: "left" | "right";
    maxWidth?: number;
    minWidth?: number;
  }>(),
  {
    border: false,
    draggable: false,
    visible: true,
    side: "left",
    maxWidth: 500,
    minWidth: 160,
    width: 256,
  },
);

const emit = defineEmits(["resize-start", "resize", "resize-end", "transitioning"]);

const aside = ref<HTMLElement>();
const classes = computed(() => [
  props.side === "left" ? "left-0" : "right-0",
  props.border ? (props.side === "left" ? "border-r border-default" : "border-l border-default") : "",
]);
const enterClass = props.side === "left" ? "-translate-x-full" : "translate-x-full";
const leaveToClass = props.side === "left" ? "-translate-x-full" : "translate-x-full";

let startX: number;
let startWidth: number;
const dragging = ref(false);
const transitioning = ref(false);

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

function onTransition(transitionActive: boolean, focusAside: boolean) {
  if (focusAside && aside.value) {
    aside.value.focus();
  }
  transitioning.value = transitionActive;
  emit("transitioning", transitioning.value);
}
</script>

<template>
  <transition
    enter-active-class="transform"
    :enter-from-class="enterClass"
    enter-to-class=""
    leave-active-class="transform"
    leave-class="translate-x-0"
    :leave-to-class="leaveToClass"
    @before-leave="onTransition(true, false)"
    @after-leave="onTransition(false, false)"
    @before-enter="onTransition(true, false)"
    @after-enter="onTransition(false, true)"
  >
    <aside
      v-show="visible"
      ref="aside"
      tabindex="0"
      :style="{
        width: `${width}px`,
        transitionProperty: dragging ? 'none' : 'transform, width',
      }"
      class="absolute top-0 z-10 h-full overflow-x-hidden duration-500 ease-in-out"
      :class="classes"
    >
      <slot />
      <button
        v-if="props.draggable"
        class="absolute top-0 h-full w-1 hover:border-action hover:bg-tertiary cursor-ew-resize"
        :class="[
          props.side === 'left' ? 'right-0 border-r' : 'left-0 border-l',
          dragging ? 'border-action bg-tertiary' : 'border-transparent bg-transparent',
        ]"
        @mousedown="startDrag"
      />
    </aside>
  </transition>
</template>
