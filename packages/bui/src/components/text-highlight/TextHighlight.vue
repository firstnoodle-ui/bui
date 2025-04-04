<template>
  <span class="relative z-0">
    <template v-if="segments.length === 0">
      {{ value }}
    </template>
    <template v-else v-for="segment in segments">
      <span
        v-if="highlight && segment.toLowerCase() === highlight.toLowerCase()"
        class="relative z-0 rounded"
        :class="[
          {
            'font-bold': bold,
            underline: underline
          },
          highlightColorClasses,
          textColorClass
        ]"
      >
        {{ segment }}
      </span>
      <span class="relative z-10" v-else>
        {{ segment }}
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    value: string;
    highlight?: string | null;
    bold?: boolean;
    underline?: boolean;
    textColorClass?: string;
    backgroundColor?: "yellow" | "green" | "blue" | "red" | "pink" | "white" | null;
  }>(),
  {
    highlight: null,
    bold: false,
    underline: false,
    textColorClass: "text-black",
    backgroundColor: null
  }
);

const segments = ref<string[]>([]);

const highlightColorClasses = computed(() => {
  if (!props.backgroundColor) return "";

  const base = "ring ring-2 shadow ";
  switch (props.backgroundColor) {
    case "yellow":
      return base + "bg-golden-sun-lighter ring-golden-sun-lighter";
    case "green":
      return base + "bg-ocean-green ring-ocean-green";
    case "blue":
      return base + "bg-light-blue ring-light-blue";
    case "red":
      return base + "bg-lava-red ring-lava-red";
    case "pink":
      return base + "bg-pink-rose ring-pink-rose";
    case "white":
      return base + "bg-white ring-white";
    default:
      return base + "bg-golden-sun ring-golden-sun";
  }
});

onBeforeMount(() => {
  segments.value = props.highlight ? segmentiseString(props.value, props.highlight) : [];
});

watch(
  () => props.highlight,
  (newValue: string | null) => {
    segments.value = newValue ? segmentiseString(props.value, newValue) : [];
  }
);

const segmentiseString = (targetString: string, searchString: string) => {
  if (!targetString || !searchString) return [];
  if (typeof targetString !== "string" || typeof searchString !== "string") return [];

  const lowerCasedTargetString = targetString.toLowerCase();
  const lowerCasedSearchString = searchString.toLowerCase();

  let segmentBreakPoints = [];
  let resultIndex = -1;

  do {
    resultIndex = lowerCasedTargetString.indexOf(lowerCasedSearchString, resultIndex + 1);
    if (resultIndex !== -1) {
      segmentBreakPoints.push(resultIndex, resultIndex + lowerCasedSearchString.length);
    }
  } while (resultIndex > -1);

  let segments = [];
  let segmentIndex = 0;

  for (const highlight of segmentBreakPoints) {
    segments.push(targetString.substring(segmentIndex, highlight));
    segmentIndex = highlight;
  }

  segments.push(targetString.substring(segmentBreakPoints[segmentBreakPoints.length - 1], targetString.length));

  return segments;
};
</script>
