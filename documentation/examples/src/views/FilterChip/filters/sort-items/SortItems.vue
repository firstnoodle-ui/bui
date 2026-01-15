<script setup lang="ts">
import type { ParsedSortingQuery, SelectListOption } from "@firstnoodle-ui/bui";
import { BButton, BPopSelect, invertSortingDirection, useSortingComponent } from "@firstnoodle-ui/bui";
import { computed } from "vue";

const { groupId, sorting } = defineProps<{ groupId: string; sorting?: ParsedSortingQuery }>();

const { updateSorting } = useSortingComponent(groupId);

const options: SelectListOption[] = [
  { label: "Rating", value: "rating" },
  { label: "Name", value: "name" },
  { label: "Price range", value: "priceRange" },
];
const selectedFieldOption = computed(() => {
  return options.find(option => option.value === (sorting || defaultSorting).field) || options[0];
});

const currentSorting = computed(() => sorting || defaultSorting);
const defaultSorting: ParsedSortingQuery = {
  direction: "asc",
  field: "rating",
};

const onChangeField = (option: SelectListOption) => {
  const targetSorting = sorting || defaultSorting;
  const newSorting: ParsedSortingQuery = {
    field: option.value,
    direction: targetSorting.direction,
  };
  updateSorting(newSorting);
};

const onUpdateDirection = () => {
  const targetSorting = sorting || defaultSorting;
  const newSorting: ParsedSortingQuery = {
    field: targetSorting.field,
    direction: invertSortingDirection(targetSorting.direction),
  };
  updateSorting(newSorting);
};
</script>

<template>
  <section class="flex items-center">
    <BPopSelect :options="options" :selected="selectedFieldOption" @select="onChangeField">
      <template #trigger="{ visible }">
        <BButton
          small
          :style="{ borderRadius: '6px 0 0 6px' }"
          variant="outlineSubtle"
          :focus="visible"
          :label="selectedFieldOption.label"
        />
      </template>
    </BPopSelect>
    <BButton
      class="-ml-px"
      :style="{ borderRadius: '0px 6px 6px 0px', width: '28px' }"
      small
      variant="outlineSubtle"
      :icon="currentSorting.direction === 'asc' ? 'sort-up' : 'sort-down'"
      @click="onUpdateDirection"
    />
  </section>
</template>
