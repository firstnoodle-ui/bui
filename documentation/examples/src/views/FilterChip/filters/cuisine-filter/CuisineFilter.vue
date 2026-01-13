<script setup lang="ts">
import type { FilterData, SelectListOption } from "@firstnoodle-ui/bui";
import type { Cuisine, Restaurant } from "../../data";
import { BFilterChip, BPopper, BPopperContent, BSelectList, BSelectListOption, useFilterComponent } from "@firstnoodle-ui/bui";
import { computed } from "vue";
import { cuisines } from "../../data";

const { filter, groupId } = defineProps<{ filter: FilterData<Restaurant>; groupId: string }>();

const cuisineOptions: SelectListOption[] = cuisines.map((cuisine: Cuisine) => {
  return {
    id: cuisine.id,
    label: cuisine.name,
    value: cuisine,
  };
});
const selectedOptions = computed(() => {
  return cuisineOptions.filter(option => values.value.includes(option.id!.toString()));
});
const { clearFilter, isActive, updateFilter, values } = useFilterComponent(groupId, filter);
</script>

<template>
  <BPopper trigger="click">
    <template #default>
      <BFilterChip
        :active="isActive.value"
        deletable
        :label="filter.name"
        :count="selectedOptions.length"
        @delete="clearFilter"
      />
    </template>
    <template #content>
      <BPopperContent class="p-2 max-h-72">
        <BSelectList
          :options="cuisineOptions"
          :selected="selectedOptions"
          @select="updateFilter"
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
