<script setup lang="ts">
import { computed } from 'vue';
import type { TAlignment, TJustification } from "../types";

const props = withDefaults(
  defineProps<{
    align?: TAlignment;
    col?: boolean;
    inline?: boolean;
    justify?: TJustification;
    tag?: string;
  }>(),
  {
    align: "center",
    col: false,
    inline: false,
    justify: "start",
    tag: "div",
  },
);

const alignmentClasses: Record<TAlignment, string> = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  stretch: "items-stretch",
} as const;

const justificationClasses: Record<TJustification, string> = {
  around: "justify-around",
  between: "justify-between",
  center: "justify-center",
  end: "justify-end",
  evenly: "justify-evenly",
  start: "justify-start",
  stretch: "justify-stretch",
} as const;

const classes = computed(() => ([
  props.inline ? "inline-flex" : "flex",
  props.col ? "flex-col items-stretch" : "",
  props.align ? alignmentClasses[props.align] : "",
  props.justify ? justificationClasses[props.justify] : "",
]));
</script>

<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>
