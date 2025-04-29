<script setup lang="ts">
/*  eslint-disable no-console */

import type { TIcon } from "@firstnoodle/bui";
import { BButton, BIcon, BPopper, BPopperContent } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const onOptionClick = (option: any) => {
  if (option.disabled) return;
  console.log("click", option.label);
};

/**
 * Below is just to point to a future development of maybe an Options component, that can handle a bunch of options (also groups), their hover index etc.
 * This could be shared across PopSelect etc.. maybe..?
 */
const onOptionHover = (option: any) => console.log("hover: handle hoverIndex", option.label);
const onOptionFocus = (option: any) => console.log("focus: handle hoverIndex", option.label);

const options = [
  {
    label: "Group 1",
    options: [
      {
        label: "Option 1",
        icon: "box",
        disabled: false,
        highlighted: false,
      },
      {
        label: "Option 2",
        icon: "paper-plane",
        disabled: false,
        highlighted: false,
      },
    ],
  },
  {
    label: "Group 2",
    options: [
      {
        label: "Option 1",
        icon: "box",
        disabled: false,
        highlighted: false,
      },
      {
        label: "Option 2",
        icon: "paper-plane",
        disabled: false,
        highlighted: false,
      },
    ],
  },
];
</script>

<template>
  <ComponentPageSection title="PopOver with option groups">
    <BPopper trigger="click">
      <template #default="slotProps">
        <BButton icon="index-finger-up" label="Choose an option" :soft-focus="slotProps && slotProps.visible" />
      </template>
      <template #content>
        <BPopperContent>
          <section v-for="group in options" :key="group.label">
            <div class="text-tertiary text-sm font-medium px-3 py-2">
              {{ group.label }}
            </div>
            <div
              v-for="option in group.options"
              :key="option.label"
              tabindex="0"
              class="flex items-center justify-between w-full h-8 px-3 space-x-2 text-sm focus:outline-hidden"
              :class="{
                'cursor-not-allowed text-muted ': option.disabled,
                'cursor-pointer text-primary hover:bg-blue-100 focus:bg-blue-100': !option.disabled,
                'bg-blue-100': option.highlighted,
                'bg-white': !option.highlighted,
              }"
              @click.stop.prevent="onOptionClick(option)"
              @keydown.enter.prevent="onOptionClick(option)"
              @mouseover="onOptionHover(option)"
              @focus="onOptionFocus(option)"
            >
              <BIcon v-if="option.icon" :name="option.icon as TIcon" />
              <span>{{ option.label }}</span>
            </div>
          </section>
        </BPopperContent>
      </template>
    </BPopper>
  </ComponentPageSection>
</template>
