<script setup lang="ts">
import type { TPopSelectOption } from "../types";
import { computed } from "vue";
import { BIcon, BPopSelect, BTooltip } from "../";
import { range } from "../../utils";

const props = withDefaults(
  defineProps<{
    noBorders?: boolean;
    currentPage: number;
    lastPage: number;
  }>(),
  {
    noBorders: false,
  },
);

const emit = defineEmits(["change"]);

const pageOptions = computed((): TPopSelectOption[] => {
  return range(0, props.lastPage).map((num: number) => ({ label: `${num + 1}` }));
});

const shared
  = "relative inline-flex items-center h-8 bg-default text-sm text-primary hover:bg-sand-grey-15 focus:z-10 focus:outline-none focus-visible:bg-sand-grey-40 active:scale-[0.98]";

const arrowClasses = computed(() => {
  return props.noBorders
    ? `${shared} px-2 rounded-lg border border-transparent focus-visible:border-true-blue`
    : `${shared} px-2 border border-default focus-visible:border-true-blue`;
});
const triggerClasses = computed(() => {
  return props.noBorders ? `${shared} px-3 rounded-lg` : `${shared} -ml-px px-3 border border-default focus-visible:border-true-blue`;
});

const onChange = (direction: -1 | 1) => {
  let targetPage = props.currentPage + direction;
  if (targetPage > props.lastPage) targetPage = 1;
  if (targetPage < 1) targetPage = props.lastPage;
  emit("change", targetPage);
};

const onPageSelect = (pageOption: TPopSelectOption) => {
  emit("change", pageOption.label);
};
</script>

<template>
  <nav class="relative z-0 inline-flex">
    <BTooltip text="Previous page" :delay="500">
      <button rel="prev" aria-label="previous page" class="rounded-l-lg" :class="[arrowClasses]" @click="onChange(-1)">
        <BIcon name="angle-left" />
      </button>
    </BTooltip>
    <BPopSelect same-width-as-trigger :value="currentPage" :options="pageOptions" @select="onPageSelect">
      <template #trigger>
        <BTooltip text="current / total" :delay="500">
          <button :class="triggerClasses">
            <span class="">{{ currentPage }}</span>
            <span class="px-2">/</span>
            <span class="">{{ lastPage }}</span>
          </button>
        </BTooltip>
      </template>
    </BPopSelect>
    <BTooltip text="Next page" :delay="500">
      <button rel="next" aria-label="next page" class="-ml-px rounded-r-lg" :class="[arrowClasses]" @click="onChange(1)">
        <BIcon name="angle-right" />
      </button>
    </BTooltip>
  </nav>
</template>
