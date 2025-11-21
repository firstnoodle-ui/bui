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
    orientation: "horizontal" | "vertical";
  }>(),
  {
    borders: false,
    startPanelDraggable: false,
    startPanelVisible: false,
    startPanelSize: 256,
    endPanelBgColorClass: "",
    endPanelDraggable: false,
    endPanelVisible: false,
    endPanelSize: 256,
    mainPanelBgColorClass: "",
    orientation: "horizontal",
  },
);

const emit = defineEmits(["start-panel-transition-end", "end-panel-transition-end"]);

// Resizing is when one of the asides is resized by dragging - then we remove transition classes
const resizing = ref(false);

// we cannot mutate props, so we create a local copy - TODO... should we not just emit the new value
const localStartPanelSize = ref(props.startPanelSize);
const localEndPanelSize = ref(props.endPanelSize);
const paddingStart = ref(props.startPanelSize);
const paddingEnd = ref(props.endPanelSize);

// handle both horizontal and vertical layouts
const mainPanelStyle = computed(() => ({
  [(props.orientation === 'horizontal' ? 'paddingLeft' : 'paddingTop')]: `${paddingStart.value}px`,
  [(props.orientation === 'horizontal' ? 'paddingRight' : 'paddingBottom')]: `${paddingEnd.value}px`,
}));

const onFirstPanelResize = (size: number) => (localStartPanelSize.value = paddingStart.value = size);
const onFirstPanelTransition = (transitioning: boolean) => !transitioning && emit("start-panel-transition-end");
const onLastPanelResize = (size: number) => (localEndPanelSize.value = paddingEnd.value = size);
const onLastPanelTransition = (transitioning: boolean) => !transitioning && emit("end-panel-transition-end");

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
      @resize-start="resizing = true"
      @resize="onFirstPanelResize"
      @resize-end="resizing = false"
      @transitioning="onFirstPanelTransition"
    >
      <slot name="start-panel" />
    </ResizablePanel>
    <main
      class="relative z-0 h-full overflow-x-hidden overflow-y-auto"
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
      @resize-start="resizing = true"
      @resize="onLastPanelResize"
      @resize-end="resizing = false"
      @transitioning="onLastPanelTransition"
    >
      <slot name="end-panel" />
    </ResizablePanel>
  </div>
</template>
