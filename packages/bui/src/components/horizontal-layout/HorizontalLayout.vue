<template>
  <div class="relative w-full h-full overflow-hidden">
    <aside-component
      v-if="slots['aside-left']"
      side="left"
      :border="props.borders"
      :draggable="asideLeftDraggable"
      :visible="asideLeftVisible"
      :width="localAsideLeftWidth"
      @resize-start="resizing = true"
      @resize="onAsideLeftResize"
      @resize-end="resizing = false"
      @transitioning="onAsideLeftTransition"
    >
      <slot name="aside-left" />
    </aside-component>
    <!-- responsiveness: md and above -->
    <main
      class="relative z-0 h-full overflow-x-hidden overflow-y-auto"
      :class="[props.mainBgColorClass, resizing ? null : 'transition-padding duration-500 ease-in-out']"
      :style="mainStyle"
    >
      <slot name="main" />
    </main>
    <aside-component
      v-if="slots['aside-right']"
      side="right"
      :border="props.borders"
      :draggable="asideRightDraggable"
      :visible="asideRightVisible"
      :width="localAsideRightWidth"
      @resize-start="resizing = true"
      @resize="onAsideRightResize"
      @resize-end="resizing = false"
      @transitioning="onAsideRightTransition"
    >
      <slot name="aside-right" />
    </aside-component>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from "vue";
import AsideComponent from "./Aside.vue";

const emit = defineEmits(["aside-left-transition-end", "aside-right-transition-end"]);

const slots = useSlots();

const defaultWidth: number = 256;
const defaultBgColorClass = "bg-light";

const props = withDefaults(
  defineProps<{
    asideLeftBgColorClass?: string;
    asideLeftDraggable?: boolean;
    asideLeftVisible?: boolean;
    asideLeftWidth?: number;
    asideRightBgColorClass?: string;
    asideRightDraggable?: boolean;
    asideRightVisible?: boolean;
    asideRightWidth?: number;
    borders?: boolean;
    mainBgColorClass?: string;
  }>(),
  {
    asideLeftBgColorClass: defaultBgColorClass,
    asideLeftDraggable: false,
    asideLeftVisible: true,
    asideLeftWidth: defaultWidth,
    asideRightBgColorClass: defaultBgColorClass,
    asideRightDraggable: false,
    asideRightVisible: true,
    asideRightWidth: defaultWidth,
    borders: false,
    mainBgColorClass: defaultBgColorClass
  }
);

// Resizing is when one of the asides is resized by dragging - then we remove transition classes
const resizing = ref(false);

// we cannot mutate props, so we create a local copy - TODO... should we not just emit the new value
const localAsideLeftWidth = ref(props.asideLeftWidth);
const localAsideRightWidth = ref(props.asideRightVisible ? props.asideRightWidth : 0);
const paddingLeft = ref(props.asideLeftWidth);
const paddingRight = ref(props.asideRightWidth);
const mainStyle = computed(() => ({
  paddingLeft: paddingLeft.value + "px",
  paddingRight: +paddingRight.value + "px"
}));
const onAsideLeftResize = (size: number) => (localAsideLeftWidth.value = paddingLeft.value = size);
const onAsideLeftTransition = (transitioning: boolean) => !transitioning && emit("aside-left-transition-end");
const onAsideRightResize = (size: number) => (localAsideRightWidth.value = paddingRight.value = size);
const onAsideRightTransition = (transitioning: boolean) => !transitioning && emit("aside-right-transition-end");

// For transitioning the padding on <main>
watch(
  () => props.asideLeftVisible,
  newValue => (paddingLeft.value = newValue ? localAsideLeftWidth.value : 0)
);
watch(
  () => props.asideRightVisible,
  newValue => (paddingRight.value = newValue ? localAsideRightWidth.value : 0)
);

// For triggering transition to a specific width
watch(
  () => props.asideLeftWidth,
  newValue => (localAsideLeftWidth.value = paddingLeft.value = newValue)
);
watch(
  () => props.asideRightWidth,
  newValue => (localAsideRightWidth.value = paddingRight.value = newValue)
);

onMounted(() => {
  paddingLeft.value = props.asideLeftVisible && slots["aside-left"] ? localAsideLeftWidth.value : 0;
  paddingRight.value = props.asideRightVisible && slots["aside-right"] ? localAsideRightWidth.value : 0;
});
</script>
