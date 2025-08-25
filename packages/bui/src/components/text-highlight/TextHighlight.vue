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
    textColorClass: "text-primary dark:text-black",
    backgroundColor: null,
  },
);

const segments = ref<string[]>([]);

const highlightColorClasses = computed(() => {
  if (!props.backgroundColor) return "";

  const base = "ring-2 shadow-sm ";
  switch (props.backgroundColor) {
    case "yellow":
      return `${base}bg-yellow-500 ring-yellow-500`;
    case "green":
      return `${base}bg-green-500 ring-green-500`;
    case "blue":
      return `${base}bg-blue-500 ring-blue-500`;
    case "red":
      return `${base}bg-red-500 ring-red-500`;
    case "pink":
      return `${base}bg-pink-500 ring-pink-500`;
    case "white":
      return `${base}bg-white ring-white`;
    default:
      return `${base}bg-yellow-500 ring-yellow-500`;
  }
});

const segmentiseString = (targetString: string, searchString: string) => {
  if (!targetString || !searchString) return [];
  if (typeof targetString !== "string" || typeof searchString !== "string") return [];

  const lowerCasedTargetString = targetString.toLowerCase();
  const lowerCasedSearchString = searchString.toLowerCase();

  const segmentBreakPoints = [];
  let resultIndex = -1;

  do {
    resultIndex = lowerCasedTargetString.indexOf(lowerCasedSearchString, resultIndex + 1);
    if (resultIndex !== -1) {
      segmentBreakPoints.push(resultIndex, resultIndex + lowerCasedSearchString.length);
    }
  } while (resultIndex > -1);

  const segments = [];
  let segmentIndex = 0;

  for (const highlight of segmentBreakPoints) {
    segments.push(targetString.substring(segmentIndex, highlight));
    segmentIndex = highlight;
  }

  segments.push(targetString.substring(segmentBreakPoints[segmentBreakPoints.length - 1], targetString.length));

  return segments;
};

onBeforeMount(() => {
  segments.value = props.highlight ? segmentiseString(props.value, props.highlight) : [];
});

watch(
  () => props.highlight,
  (newValue: string | null) => {
    segments.value = newValue ? segmentiseString(props.value, newValue) : [];
  },
);
</script>

<template>
  <span class="relative z-0">
    <template v-if="segments.length === 0">
      {{ value }}
    </template>
    <template v-for="(segment, index) in segments" v-else :key="`${segment}_${index}`">
      <span
        v-if="highlight && segment.toLowerCase() === highlight.toLowerCase()"
        class="relative z-0 rounded"
        :class="[
          {
            'font-bold': bold,
            'underline': underline,
          },
          highlightColorClasses,
          textColorClass,
        ]"
      >
        {{ segment }}
      </span>
      <span v-else class="relative z-10">
        {{ segment }}
      </span>
    </template>
  </span>
</template>
