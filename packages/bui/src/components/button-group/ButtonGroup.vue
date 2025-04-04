<script setup lang="ts">
import type { TButtonGroupOrientation } from "../types";
import { onMounted, provide, ref } from "vue";

const props = withDefaults(
  defineProps<{
    direction?: TButtonGroupOrientation;
    fullwidth?: boolean;
  }>(),
  {
    direction: "horizontal",
    fullwidth: false,
  },
);

const classes = ref<string>("");
const buttonGroupRef = ref<HTMLDivElement>();

provide("childOfButtonGroup", true);

/**
 * We need to update (reapply) the classes whenever a button in the group is clicked,
 * as its classes from within the button component might be updated and thus the classes applied here will be overwritten
 */
const update = () => {
  const result = [];

  props.fullwidth ? result.push("flex w-full") : result.push("inline-flex");

  if (props.direction === "vertical") {
    result.push("flex-col items-stretch");
  }
  else {
    result.push("items-center");
  }

  classes.value = result.join(" ");

  // add classes to immediate children of button group
  // the buttons inside the group might be wrapped in other elements if tooltip or popper is used
  if (buttonGroupRef.value) {
    Array.from(buttonGroupRef.value.children).forEach((child: Element, index: number) => {
      if (props.direction === "vertical") {
        child.classList.add("-mt-px");
        child.classList.add("first:mt-0");

        if (index === 0) {
          if (child.nodeName === "BUTTON") {
            child.classList.add("rounded-t-md");
          }
          else {
            child.querySelector("button")?.classList.add("rounded-t-md");
          }
        }
        else if (index === buttonGroupRef.value!.children.length - 1) {
          if (child.nodeName === "BUTTON") {
            child.classList.add("rounded-b-md");
          }
          else {
            child.querySelector("button")?.classList.add("rounded-b-md");
          }
        }
      }
      else {
        child.classList.add("-ml-px");
        child.classList.add("first:ml-0");

        // TODO: if child is button, do not query for it
        if (index === 0) {
          if (child.nodeName === "BUTTON") {
            child.classList.add("rounded-l-md");
          }
          else {
            child.querySelector("button")?.classList.add("rounded-l-md");
          }
        }
        else if (index === buttonGroupRef.value!.children.length - 1) {
          if (child.nodeName === "BUTTON") {
            child.classList.add("rounded-r-md");
          }
          else {
            child.querySelector("button")?.classList.add("rounded-r-md");
          }
        }
      }
    });
  }
};

onMounted(update);
</script>

<template>
  <div ref="buttonGroupRef" :class="classes" @click.stop.prevent="update">
    <slot />
  </div>
</template>
