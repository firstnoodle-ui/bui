<script setup lang="ts">
import type { Filter, SelectListOption } from "@firstnoodle-ui/bui";
import type { DietaryOption, Restaurant } from "../../data";
import { BFilterChip, BPopper, BPopperContent, BSelectList, BSelectListOption, useFilterComponent } from "@firstnoodle-ui/bui";
import { computed } from "vue";
import { dietaryOptions } from "../../data";

const { filter, groupId } = defineProps<{ filter: Filter<Restaurant>; groupId: string }>();

const selectListOptions: SelectListOption[] = dietaryOptions.map((option: DietaryOption) => {
  return {
    id: option.id,
    label: option.name,
    value: option,
  };
});

// key point for retrieving selection
const selectedOptions = computed(() => {
  // return cuisineOptions.filter(option => values.value.includes(option.value.label));
  return selectListOptions.filter(option => values.value.includes(option.value.id.toString()));
});
const { clearFilter, isActive, updateFilter, values } = useFilterComponent(groupId, filter);

// key point for selecing what goes in the url
const onSelectionChange = (selection: SelectListOption[]) => {
  // updateFilter(selection.map(o => o.value.label));
  updateFilter(selection.map(o => o.value.id));
};
</script>

<template>
  <BPopper trigger="click">
    <template #default>
      <BFilterChip
        :active="isActive"
        :count="selectedOptions.length"
        :label="filter.name"
        deletable
        @delete="clearFilter"
      />
    </template>
    <template #content>
      <BPopperContent class="p-2 max-h-72">
        <BSelectList
          :options="selectListOptions"
          :selected="selectedOptions"
          @select="onSelectionChange"
        >
          <template #options="{ options, getIsSelected, select }">
            <BSelectListOption
              v-for="option in (options as SelectListOption[])"
              :key="option.id"
              :option="option"
              :selected="getIsSelected(option)"
              @click="select(option)"
            />
          </template>
        </BSelectList>
      </BPopperContent>
    </template>
  </BPopper>
</template>
