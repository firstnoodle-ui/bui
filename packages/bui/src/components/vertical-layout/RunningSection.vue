<script setup lang="ts">
import type { TSectionType } from "./types";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    border?: boolean;
    heightClass?: string;
    type?: TSectionType;
  }>(),
  {
    border: false,
    heightClass: "h-12",
    type: "header",
  },
);

const containerRef = ref<HTMLElement>();
const borderPosition = props.type === "header" ? "border-b" : "border-t";

const classes = computed(() => {
  return [props.heightClass, props.border ? "border-default" : "border-transparent", props.border ? borderPosition : ""];
});

const heightStyle = computed(() => {
  let height;

  // if height is auto we have to use js to calculate and actual height in pixels
  // otherwise the height can't be animated
  if (props.heightClass === "h-auto") {
    if (containerRef.value) {
      height = 0;
      for (const child of containerRef.value.children) {
        height += (child as HTMLElement).offsetHeight;
      }
      height = `${height}px`;
    }
    return { height };
  }
  return {};
});
</script>

<template>
  <component
    :is="type"
    ref="containerRef"
    class="flex-none w-full overflow-hidden transition-height duration-500 ease-in-out"
    :class="classes"
    :style="heightStyle"
  >
    <slot />
  </component>
</template>
