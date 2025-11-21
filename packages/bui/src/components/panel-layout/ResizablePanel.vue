<script setup lang="ts">
import { computed, ref } from "vue";
import { clamp } from "../../utils";

const props = withDefaults(
  defineProps<{
    size?: number;
    border?: boolean;
    draggable?: boolean;
    placement?: "top" | "bottom" | "left" | "right";
    maxSize?: number;
    minSize?: number;
  }>(),
  {
    border: false,
    draggable: false,
    placement: "left",
    maxSize: 1000,
    minSize: 50,
    size: 256,
  },
);

const emit = defineEmits(["resize-start", "resize", "resize-end"]);

const orientation = computed(() => (["left", "right"].includes(props.placement) ? "horizontal" : "vertical"));

const aside = ref<HTMLElement>();
const rootClasses = computed(() => {
  let placementClass;
  let borderClass;

  if(orientation.value === "horizontal") {
    placementClass = props.placement === "left" ? "left-0" : "right-0";
    placementClass += " top-0 h-full overflow-x-hidden";
    borderClass = props.border ? (props.placement === "left" ? "border-r border-default" : "border-l border-default") : "";
  } else {
    placementClass = props.placement === "top" ? "top-0" : "bottom-0";
    placementClass += " left-0 w-full overflow-y-hidden";
    borderClass = props.border ? (props.placement === "top" ? "border-b border-default" : "border-t border-default") : "";
  }
  return [
    placementClass,
    borderClass,
  ];
});

const borderClasses = computed(() => {
  let classes = [];

  if(orientation.value === "horizontal") {
    classes.push(props.placement === "left" ? "right-0 border-r" : "left-0 border-l");
    classes.push('top-0 h-full w-1 cursor-ew-resize');
  } else {
    classes.push(props.placement === "top" ? "bottom-0 border-b" : "top-0 border-t");
    classes.push('left-0 w-full h-1 cursor-ns-resize');
  }

  classes.push( 
    
  );

  return classes;
});

let startPos: number;
let startSize: number;
const dragging = ref(false);

function startDrag(event: MouseEvent) {
  const targetAxis = props.placement === "left" || props.placement === "right" ? "pageX" : "pageY"; 
  startPos = event[targetAxis];
  startSize = props.size;
  dragging.value = true;
  window.addEventListener("mouseup", endDrag);
  window.addEventListener("mousemove", onDrag);
  emit("resize-start");
}

function onDrag(event: MouseEvent) {
  let delta: number;

  if(orientation.value === "vertical") {
    delta = props.placement === "top" ? event.pageY - startPos : startPos - event.pageY;
  } else {
    delta = props.placement === "left" ? event.pageX - startPos : startPos - event.pageX;
  }

  const dragTo = startSize + delta;
  const result = clamp(dragTo, props.minSize, props.maxSize);

  if (result !== props.size) {
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
  let newSize = props.size;

  if (props.placement === "left") {
    if (event.key === "ArrowLeft") {
      newSize = props.size - resizeStep;
    }
    else if (event.key === "ArrowRight") {
      newSize = props.size + resizeStep;
    }
  }
  else if (props.placement === "right") {
    if (event.key === "ArrowLeft") {
      newSize = props.size + resizeStep;
    }
    else if (event.key === "ArrowRight") {
      newSize = props.size - resizeStep;
    }
  } else if (props.placement === "top") {
    if (event.key === "ArrowUp") {
      newSize = props.size - resizeStep;
    }
    else if (event.key === "ArrowDown") {
      newSize = props.size + resizeStep;
    }
  }
  else if (props.placement === "bottom") {
    if (event.key === "ArrowUp") {
      newSize = props.size + resizeStep;
    }
    else if (event.key === "ArrowDown") {
      newSize = props.size - resizeStep;
    }
  }

  if (newSize !== props.size) {
    event.preventDefault();
    const clampedWidth = clamp(newSize, props.minSize, props.maxSize);
    if (clampedWidth !== props.size) {
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
      [orientation === 'horizontal' ? 'width' : 'height']: `${size}px`,
      transitionProperty: dragging ? 'none' : `transform, ${['left', 'right'].includes(placement) ? 'width' : 'height'}`,
    }"
    class="absolute z-10 bg-primary"
    :class="rootClasses"
  >
    <slot />
    <button
      v-if="props.draggable"
      tabindex="0"
      :aria-label="`Resize ${props.placement} panel`"
      class="absolute hover:border-action"
      :class="[
        borderClasses,
        dragging ? 'border-action bg-action' : 'border-transparent bg-transparent hover:bg-tertiary focus:outline-none focus:border-action focus:bg-tertiary',
      ]"
      @mousedown="startDrag"
      @keydown="onKeyDown"
    />
  </aside>
</template>
