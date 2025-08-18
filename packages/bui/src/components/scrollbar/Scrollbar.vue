<script setup lang="ts">
import type { ScrollIntersectionEvent, ScrollTrigger, ThumbDragEvent } from "./types";
import { nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import Bar from "./Bar.vue";
import "./style.scss";

const props = withDefaults(
  defineProps<{
    disableX?: boolean;
    disableY?: boolean;
    wrapClass?: string;
    viewClass?: string;
    viewHeightClass?: string;
    noresize?: boolean;
    show?: boolean;
    tag?: string;
    triggers?: ScrollTrigger[];
    windowResize?: boolean;
  }>(),
  {
    disableX: false,
    disableY: false,
    wrapClass: "",
    viewClass: "h-full",
    viewHeightClass: "h-full",
    noresize: false,
    show: false,
    tag: "div",
    windowResize: false,
  },
);

const emit = defineEmits<{
  intersect: [ScrollIntersectionEvent];
  scroll: [value: number];
  scrollXActive: [value: boolean];
  scrollYActive: [value: boolean];
}>();

let mutationObserver: MutationObserver;

const gutterWidth = ref(6);
const moveX = ref(0);
const moveY = ref(0);
const previousY = ref(0);
const sizeHeight = ref("0");
const sizeWidth = ref("0");
const wrapStyle = reactive({
  marginRight: "",
  marginBottom: "",
});
const cachedSizePercentages = { height: 100, width: 100 };

const wrapClasses = ["scrollbar__wrap"];
!gutterWidth.value && wrapClasses.push("scrollbar__wrap--hidden-default");
props.wrapClass && wrapClasses.push(props.wrapClass);

const wrapRef = ref();
const contentRef = ref();

const onScroll = () => {
  moveY.value = (wrapRef.value.scrollTop * 100) / wrapRef.value.clientHeight;
  moveX.value = (wrapRef.value.scrollLeft * 100) / wrapRef.value.clientWidth;
  emit("scroll", wrapRef.value.scrollTop);

  const thumbBottomY = wrapRef.value.scrollTop + wrapRef.value.clientHeight;
  const scrollBottom = wrapRef.value.scrollHeight;

  if (previousY.value > 0 && wrapRef.value.scrollTop === 0) {
    emit("intersect", { edge: "top", hit: true });
  }
  else if (previousY.value === 0 && wrapRef.value.scrollTop > 0) {
    emit("intersect", { edge: "top", hit: false });
  }
  else if (previousY.value + wrapRef.value.clientHeight < scrollBottom && thumbBottomY === scrollBottom) {
    emit("intersect", { edge: "bottom", hit: true });
  }
  else if (previousY.value + wrapRef.value.clientHeight === scrollBottom && thumbBottomY < scrollBottom) {
    emit("intersect", { edge: "bottom", hit: false });
  }

  if (props.triggers) {
    for (const trigger of props.triggers) {
      if (previousY.value < trigger.px && wrapRef.value.scrollTop >= trigger.px) {
        trigger.callback(trigger, "down");
      }
      else if (previousY.value > trigger.px && wrapRef.value.scrollTop <= trigger.px) {
        trigger.callback(trigger, "up");
      }
    }
  }

  previousY.value = wrapRef.value.scrollTop;
};

const updateSizePercentages = () => {
  return {
    heightPercentage: (wrapRef.value.clientHeight * 100) / wrapRef.value.scrollHeight,
    widthPercentage: (wrapRef.value.clientWidth * 100) / wrapRef.value.scrollWidth,
  };
};

const update = async () => {
  if (!wrapRef.value) return;

  await nextTick();

  const { heightPercentage, widthPercentage } = updateSizePercentages();

  if (!heightPercentage && !widthPercentage) return;

  if (!props.disableX) {
    if (cachedSizePercentages.width === 100 && widthPercentage < 100) {
      emit("scrollXActive", true);
    }
    else if (widthPercentage === 100 && cachedSizePercentages.width < 100) {
      emit("scrollXActive", false);
    }

    if (widthPercentage === 100) {
      wrapStyle.marginBottom = `0px`;
    }
    else {
      if (gutterWidth.value) {
        wrapStyle.marginBottom = `-${gutterWidth.value}px`;
      }
    }
    cachedSizePercentages.width = widthPercentage;
    sizeWidth.value = widthPercentage < 100 ? `${widthPercentage}%` : "";
  }

  if (!props.disableY) {
    if (cachedSizePercentages.height === 100 && heightPercentage < 100) {
      emit("scrollYActive", true);
    }
    else if (heightPercentage === 100 && cachedSizePercentages.height < 100) {
      emit("scrollYActive", false);
    }

    if (heightPercentage === 100) {
      wrapStyle.marginRight = `0px`;
    }
    else {
      if (gutterWidth.value) {
        wrapStyle.marginRight = `-${gutterWidth.value}px`;
      }
    }
    cachedSizePercentages.height = heightPercentage;
    sizeHeight.value = heightPercentage < 100 ? `${heightPercentage}%` : "";
  }

  onScroll();
};

onMounted(async () => {
  await nextTick(update);

  if (cachedSizePercentages.height === 100) {
    emit("intersect", { edge: "top", hit: true });
  }

  props.windowResize && window.addEventListener("resize", update);
  if (!props.noresize) {
    mutationObserver = new MutationObserver(update);
    mutationObserver.observe(contentRef.value, {
      childList: true,
      subtree: true,
    });
  }
});

onBeforeUnmount(() => {
  !props.noresize && mutationObserver.disconnect();
  props.windowResize && window.removeEventListener("resize", update);
});

const onBarUpdate = (event: ThumbDragEvent) => {
  wrapRef.value[event.scrollReference] = (event.positionPercentage * wrapRef.value[event.scrollSize]) / 100;
};

const scrollToPercentage = (axis: "x" | "y", percentage: number) => {
  if (axis === "x") {
    wrapRef.value.scrollTo({ left: (wrapRef.value.scrollWidth * percentage) / 100, behavior: "smooth" });
  }
  else {
    wrapRef.value.scrollTo({ top: (wrapRef.value.scrollHeight * percentage) / 100, behavior: "smooth" });
  }
  onScroll();
};

const jumpToPercentage = (axis: "x" | "y", percentage: number) => {
  if (axis === "x") {
    wrapRef.value.scrollLeft = (wrapRef.value.scrollWidth * percentage) / 100;
  }
  else {
    wrapRef.value.scrollTop = (wrapRef.value.scrollHeight * percentage) / 100;
  }
  onScroll();
};

const reset = () => {
  wrapRef.value.scrollTop = 0;
  onScroll();
};

defineExpose({ handleScroll: onScroll, reset, jumpToPercentage, scrollToPercentage, update });
</script>

<template>
  <main class="scrollbar scroll-hidden" :class="[viewHeightClass, { show }]">
    <div id="wrapRef" ref="wrapRef" class="relative" :class="[wrapClasses]" :style="wrapStyle" @scroll="onScroll">
      <component :is="props.tag" ref="contentRef" class="scrollbar__view relative" :class="[viewClass]">
        <slot />
      </component>
    </div>
    <Bar v-if="!disableX" :move="moveX" :size="sizeWidth" @update="onBarUpdate" />
    <Bar v-if="!disableY" :move="moveY" :size="sizeHeight" vertical @update="onBarUpdate" />
  </main>
</template>
