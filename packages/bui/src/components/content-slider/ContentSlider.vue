<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from "vue";
import { BButton } from "../../";
import { useNextFrame } from "../../composables";

const scrollPosition = ref(0);
const scrollStep = 120; // Change this value to adjust the scroll amount

const listContainer = ref<HTMLElement | null>(null);
const buttonList = ref<HTMLElement | null>(null);

const showLeftButton = computed(() => scrollPosition.value > 0);
const showRightButton = computed(() => {
  return scrollPosition.value < contentWidth.value - containerWidth.value;
});

const containerWidth = ref(listContainer.value ? listContainer.value.clientWidth : 0);
const contentWidth = ref(buttonList.value ? buttonList.value.scrollWidth : 0);
const scrollLeft = () => scrollPosition.value = Math.max(0, scrollPosition.value - scrollStep);
const scrollRight = () => {
  scrollPosition.value = Math.min(contentWidth.value - containerWidth.value, scrollPosition.value + scrollStep);
};

const { nextFrame } = useNextFrame();
const update = () => {
  nextTick(() => {
    nextFrame(() => {
      containerWidth.value = listContainer.value ? listContainer.value.clientWidth : 0;
      contentWidth.value = buttonList.value ? buttonList.value.scrollWidth : 0;
      if (containerWidth.value >= contentWidth.value) {
        scrollPosition.value = 0;
      }
    });
  });
};
onMounted(update);
defineExpose({ update });
</script>

<template>
  <div ref="listContainer" class="relative flex-1 flex items-center py-1 overflow-hidden whitespace-nowrap">
    <aside
      v-if="showLeftButton"
      class="absolute w-16 left-0 z-10 h-full flex items-center"
      style="background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 10%, rgba(255,255,255,0) 100%)"
    >
      <BButton
        small
        icon="chevron-left"
        variant="outline"
        class="shadow-sm"
        @click="scrollLeft"
      />
    </aside>

    <main
      ref="buttonList"
      class="flex items-center gap-2 snap-x scroll-px-2 transition-transform duration-300"
      :style="{ transform: `translateX(-${scrollPosition}px)` }"
    >
      <slot />
    </main>

    <aside
      v-if="showRightButton"
      class="absolute w-16 right-0 z-10 h-full flex items-center justify-end pl-2"
      style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 90%, rgba(255,255,255,1) 100%)"
    >
      <BButton
        v-if="showRightButton"
        small
        icon="chevron-right"
        variant="outline"
        class="shadow-sm"
        @click="scrollRight"
      />
    </aside>
  </div>
</template>
