<script setup lang="ts">
import type { TPopSelectOption } from "../types";
import { computed, ref } from "vue";
import { BButton, BPopSelect } from "../";
import { range } from "../../utils";

const { borders = false, currentPage, lastPage, orientation = "horizontal" } = defineProps<{
  borders?: boolean;
  currentPage: number;
  lastPage: number;
  orientation?: "horizontal" | "vertical";
}>();

const emit = defineEmits(["change"]);
const navRef = ref<HTMLElement>();

const pageOptions = computed((): TPopSelectOption[] => {
  return range(0, lastPage).map((num: number) => ({ label: `${num + 1}` }));
});
const prevStyle = borders ? { borderRadius: "8px 0 0 8px" } : undefined;
const nextStyle = borders ? { borderRadius: "0px 8px 8px 0px" } : undefined;
const midStyle = borders ? { borderRadius: "0" } : undefined;
const variant = borders ? "outlineSubtle" : "textSubtle";

const onChange = (direction: -1 | 1) => {
  let targetPage = currentPage + direction;
  if (targetPage > lastPage) targetPage = 1;
  if (targetPage < 1) targetPage = lastPage;
  emit("change", targetPage);
};

const onPageSelect = (pageOption: TPopSelectOption) => {
  emit("change", pageOption.label);
};
</script>

<template>
  <nav ref="navRef" class="relative z-0 inline-flex">
    <BButton
      :variant="variant"
      :icon="orientation === 'horizontal' ? 'chevron-left' : 'chevron-up'"
      :style="prevStyle"
      class="z-0 hover:z-10 focus:z-10 active:z-10"
      @click="onChange(-1)"
    />
    <BPopSelect :same-width-as-element="navRef" placement="bottom" :value="currentPage" :options="pageOptions" @select="onPageSelect">
      <template #trigger="slotProps">
        <BButton
          :variant="variant"
          :label="`${currentPage} / ${lastPage}`"
          :style="midStyle"
          :focus="slotProps && slotProps.visible"
          class="z-0 hover:z-10 focus:z-10 active:z-10 -ml-px"
        />
      </template>
    </BPopSelect>
    <BButton
      :variant="variant"
      :icon="orientation === 'horizontal' ? 'chevron-right' : 'chevron-down'"
      :style="nextStyle"
      class="z-0 hover:z-10 focus:z-10 active:z-10 -ml-px"
      @click="onChange(1)"
    />
  </nav>
</template>
