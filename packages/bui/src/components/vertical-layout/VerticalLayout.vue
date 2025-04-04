<script setup lang="ts">
import { BFlexbox, BScrollbar } from "../";
import RunningSection from "./RunningSection.vue";

const props = withDefaults(
  defineProps<{
    borders?: boolean;
    footerHeightClass?: string;
    headerHeightClass?: string;
    widthClass?: string;
    windowFrame?: boolean;
    mainClasses?: string;
  }>(),
  {
    borders: false,
    footerHeightClass: "h-content",
    headerHeightClass: "h-content",
    widthClass: "w-full",
    windowFrame: false,
  },
);

const classes = [props.widthClass, props.windowFrame ? "px-8 py-6 bg-light shadow-xl rounded-lg" : ""];
</script>

<template>
  <BFlexbox col align="stretch" justify="start" class="relative h-full overflow-x-hidden" :class="classes">
    <RunningSection v-if="$slots.header" type="header" :border="borders" :height-class="headerHeightClass">
      <slot name="header" />
    </RunningSection>

    <BScrollbar window-resize :wrap-class="mainClasses">
      <slot name="main" />
    </BScrollbar>

    <RunningSection v-if="$slots.footer" type="footer" :border="borders" :height-class="footerHeightClass">
      <slot name="footer" />
    </RunningSection>
  </BFlexbox>
</template>
