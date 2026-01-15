<script setup lang="ts">
import type { Filter, SelectListOption } from "@firstnoodle-ui/bui";
import type { Cuisine, Restaurant } from "../../data";
import { BButton, BFilterChip, BPopper, BPopperContent, BSelectList, BSelectListOption, useFilterComponent } from "@firstnoodle-ui/bui";
import { computed } from "vue";
import { cuisines } from "../../data";

const { filter, groupId } = defineProps<{ filter: Filter<Restaurant>; groupId: string }>();

const cuisineOptions: SelectListOption[] = cuisines.map((cuisine: Cuisine) => {
  return {
    id: cuisine.id,
    label: cuisine.name,
    value: cuisine,
  };
});

const { clearFilter, isActive, updateFilter, values } = useFilterComponent(groupId, filter);
const selectedOptions = computed(() => cuisineOptions.filter(option => values.value.includes(option.value.id.toString())));
const onSelectionChange = (selection: SelectListOption[]) => updateFilter(selection.map(o => o.value.id));
</script>

<template>
  <BPopper trigger="click">
    <template #default="{ visible }">
      <BFilterChip
        :active="isActive"
        :count="selectedOptions.length"
        :focus="visible"
        :label="filter.name"
        deletable
        @delete="clearFilter"
      />
    </template>
    <template #content>
      <BPopperContent>
        <BSelectList
          select-all
          :options="cuisineOptions"
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
          <template #footer>
            <div class="p-1">
              <BButton
                :disabled="!isActive"
                small
                fullwidth
                space-between
                variant="text"
                icon="close"
                label="Clear"
                @click="clearFilter"
              />
            </div>
          </template>
        </BSelectList>
      </BPopperContent>
    </template>
  </BPopper>
</template>
