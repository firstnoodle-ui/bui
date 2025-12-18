<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from "vue";
import ResizablePanel from "./ResizablePanel.vue";

const props = withDefaults(
  defineProps<{
    borders?: boolean;
    startPanelDraggable?: boolean;
    startPanelVisible?: boolean;
    startPanelSize?: number;
    endPanelBgColorClass?: string;
    endPanelDraggable?: boolean;
    endPanelVisible?: boolean;
    endPanelSize?: number;
    mainPanelBgColorClass?: string;
    orientation?: "horizontal" | "vertical";
  }>(),
  {
    borders: false,
    startPanelDraggable: false,
    startPanelVisible: false,
    startPanelSize: 48,
    endPanelBgColorClass: "",
    endPanelDraggable: false,
    endPanelVisible: false,
    endPanelSize: 256,
    mainPanelBgColorClass: "",
    orientation: "horizontal",
  },
);

const emit = defineEmits<{
  (e: "start-panel-resize", size: number): void;
  (e: "start-panel-resize-end"): void;
  (e: "start-panel-resize-start"): void;
  (e: "start-panel-transition-end"): void;
  (e: "end-panel-resize", size: number): void;
  (e: "end-panel-resize-end"): void;
  (e: "end-panel-resize-start"): void;
  (e: "end-panel-transition-end"): void;
}>();

// Resizing is when one of the asides is resized by dragging - then we remove transition classes
const resizing = ref(false);

// we cannot mutate props, so we create a local copy - TODO... should we not just emit the new value
const localStartPanelSize = ref(props.startPanelSize);
const localEndPanelSize = ref(props.endPanelSize);
const paddingStart = ref(props.startPanelSize);
const paddingEnd = ref(props.endPanelSize);

// handle both horizontal and vertical layouts
const mainPanelStyle = computed(() => ({
  [(props.orientation === "horizontal" ? "paddingLeft" : "paddingTop")]: `${paddingStart.value}px`,
  [(props.orientation === "horizontal" ? "paddingRight" : "paddingBottom")]: `${paddingEnd.value}px`,
}));

// Start panel events
const onStartPanelResizeEnd = () => {
  resizing.value = false;
  emit("start-panel-resize-end");
};
const onStartPanelResizeStart = () => {
  resizing.value = true;
  emit("start-panel-resize-start");
};
const onStartPanelResize = (size: number) => {
  localStartPanelSize.value = paddingStart.value = size;
  emit("start-panel-resize", size);
};
const onStartPanelTransitionEnd = (transitioning: boolean) => !transitioning && emit("start-panel-transition-end");

// End panel events 
const onEndPanelResizeEnd = () => {
  resizing.value = false;
  emit("end-panel-resize-end");
};
const onEndPanelResizeStart = () => {
  resizing.value = true;
  emit("end-panel-resize-start");
};
const onEndPanelResize = (size: number) => {
  localEndPanelSize.value = paddingEnd.value = size;
  emit("end-panel-resize", size);
};
const onEndPanelTransitionEnd = (transitioning: boolean) => !transitioning && emit("end-panel-transition-end");

// For transitioning the padding on <main>
watch(
  () => props.startPanelVisible,
  newValue => (paddingStart.value = newValue ? localStartPanelSize.value : 0),
);
watch(
  () => props.endPanelVisible,
  newValue => (paddingEnd.value = newValue ? localEndPanelSize.value : 0),
);

// For triggering transition to a specific width
watch(
  () => props.startPanelSize,
  newValue => (localStartPanelSize.value = paddingStart.value = newValue),
);
watch(
  () => props.endPanelSize,
  newValue => (localEndPanelSize.value = paddingEnd.value = newValue),
);

const slots = useSlots();

onMounted(() => {
  paddingStart.value = props.startPanelVisible && slots["start-panel"] ? localStartPanelSize.value : 0;
  paddingEnd.value = props.endPanelVisible && slots["end-panel"] ? localEndPanelSize.value : 0;
});
</script>

<template>
  <div class="relative w-full h-full overflow-hidden bg-primary">
    <ResizablePanel
      v-if="slots['start-panel'] && startPanelVisible"
      :placement="orientation === 'horizontal' ? 'left' : 'top'"
      :border="props.borders"
      :draggable="startPanelDraggable"
      :size="localStartPanelSize"
      @resize-start="onStartPanelResizeStart"
      @resize="onStartPanelResize"
      @resize-end="onStartPanelResizeEnd"
      @transitioning="onStartPanelTransitionEnd"
    >
      <slot name="start-panel" />
    </ResizablePanel>
    <main
      class="relative z-0 h-full overflow-hidden"
      :class="[props.mainPanelBgColorClass]"
      :style="mainPanelStyle"
    >
      <slot name="main" />
    </main>
    <ResizablePanel
      v-if="slots['end-panel'] && endPanelVisible"
      :placement="orientation === 'horizontal' ? 'right' : 'bottom'"
      :border="props.borders"
      :draggable="endPanelDraggable"
      :size="localEndPanelSize"
      @resize-start="onEndPanelResizeStart"
      @resize="onEndPanelResize"
      @resize-end="onEndPanelResizeEnd"
      @transitioning="onEndPanelTransitionEnd"
    >
      <slot name="end-panel" />
    </ResizablePanel>
  </div>
</template>
