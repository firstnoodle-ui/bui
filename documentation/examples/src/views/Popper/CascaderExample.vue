<script setup lang="ts">
import type { TColumnNavigationOption } from "@firstnoodle-ui/bui";
import { BButton, BPopper, BPopperContent } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import CascaderOption from "./CascaderOption.vue";

const rootPopperRef = ref<typeof BPopper | null>(null);

const onUpdateTargets = (targets: HTMLElement[]) => {
  // eslint-disable-next-line no-console
  console.log("update", targets);
  if (rootPopperRef.value === null) return;
  rootPopperRef.value.updateClickOutsideTargets(targets);
};

const options: TColumnNavigationOption[] = [
  {
    type: "withDescription",
    label: "Stuff",
    value: "stuff",
    description: "This is my description",
  },
  {
    type: "withChildren",
    label: "Animals",
    value: "animals",
    children: [
      {
        type: "withChildren",
        label: "Vegetarians",
        value: "vegetarians",
        children: [
          {
            label: "Cow",
            value: "cow",
          },
          {
            label: "Turtle",
            value: "turtle",
          },
        ],
      },
      {
        type: "withChildren",
        label: "Predators",
        value: "predators",
        children: [
          {
            label: "Cat",
            value: "cat",
          },
          {
            label: "Shark",
            value: "shark",
          },
          {
            label: "Lion",
            value: "lion",
          },
        ],
      },
    ],
  },
  {
    type: "withChildren",
    label: "Fruits",
    value: "fruits",
    children: [
      {
        label: "Sour",
        value: "sour",
        children: [
          {
            label: "Lemon",
            value: "lemon",
          },
          {
            label: "Kiwi",
            value: "kiwi",
          },
        ],
      },
      {
        type: "withChildren",
        label: "Sweet",
        value: "sweet",
        children: [
          {
            label: "Banana",
            value: "banana",
            description: "A banana is yellow",
          },
          {
            label: "Mango",
            value: "mango",
          },
        ],
      },
    ],
  },
  {
    type: "withChildren",
    label: "Sports",
    value: "sports",
    children: [
      {
        label: "Team",
        value: "team",
        children: [
          {
            type: "withChildren",
            label: "Ball",
            value: "ball",
            children: [
              {
                label: "Football",
                value: "football",
              },
              {
                label: "Cricket",
                value: "cricket",
              },
              {
                label: "Basketball",
                value: "basketball",
              },
              {
                label: "Polo",
                value: "polo",
              },
            ],
          },
          {
            type: "withChildren",
            label: "No ball",
            value: "noball",
            children: [
              {
                label: "Cycling",
                value: "cycling",
              },
              {
                label: "Sailing",
                value: "sailing",
              },
            ],
          },
        ],
      },
      {
        type: "withChildren",
        label: "Solo",
        value: "solo",
        children: [
          {
            label: "Running",
            value: "running",
          },
          {
            label: "Swimming",
            value: "swimming",
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <ComponentPageSection title="Cascader">
    <BPopper ref="rootPopperRef" trigger="click">
      <template #default="slotProps">
        <BButton icon="box" label="One" :soft-focus="slotProps && slotProps.visible" />
      </template>
      <template #content>
        <BPopperContent>
          <main class="flex flex-col">
            <CascaderOption v-for="option in options" :key="option.value" :option="option" @update-targets="onUpdateTargets" />
          </main>
        </BPopperContent>
      </template>
    </BPopper>
  </ComponentPageSection>
</template>
