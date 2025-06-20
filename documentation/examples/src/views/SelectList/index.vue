<script setup lang="ts">
import type { SelectListOption, SelectListOptionGroup } from "@firstnoodle-ui/bui";
import { BSelectList, BSelectListOption, BSelectListOptionGroup } from "@firstnoodle-ui/bui";
import { computed, ref } from "vue";
import {
  ComponentPage,
  EventFlasher,
  PropControlBoolean,
} from "../../components";
import EventSection from "../../components/EventSection.vue";
import { demoOptions, filters, groupedOptions } from "./data";

const selectRef = ref<typeof EventFlasher>();

// multiselect - In progress.....
const isMultiSelect = ref(false);
const onToggleMultiSelect = () => {
  isMultiSelect.value = !isMultiSelect.value;
};

const selected = ref<SelectListOption[]>([]);
const updateSelection = (selection: SelectListOption[]) => selected.value = [...selection];

const isCheckbox = ref(true);
const showIcons = ref(true);

// group
const hasGroupedOptions = ref(false);
const selectListOptions = computed(() => hasGroupedOptions.value ? groupedOptions : demoOptions);

// search related
const hasSearch = ref(false);
const searchQuery = ref("");
const onSearch = (query: string) => searchQuery.value = query;
const searchFunction = computed(() => hasSearch.value ? onSearch : undefined);
const computedOptions = computed(() => {
  if (searchQuery.value.length > 0) {
    if (hasGroupedOptions.value) {
      const groups = selectListOptions.value as SelectListOptionGroup[];
      return groups.map((group) => {
        return {
          ...group,
          options: group.options.filter((option: SelectListOption) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase())),
        };
      });
    }
    else {
      const typedOptions = selectListOptions.value as SelectListOption[];
      return typedOptions.filter((option: SelectListOption) => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
  }
  return selectListOptions.value;
});

// filters
const hasFilters = ref(false);
const optionFilters = computed(() => hasFilters.value ? filters : undefined);

// selectAll
const hasSelectAll = ref(false);
</script>

<template>
  <ComponentPage title="SelectList">
    <template #default="{ print }">
      <div class="w-96 border border-default rounded-lg overflow-hidden">
        <BSelectList
          :select-all="hasSelectAll"
          :search-function="searchFunction"
          :options="computedOptions"
          :filters="optionFilters"
          :selected="selected"
          @select="updateSelection"
        >
          <template #options="{ options, select, getIsSelected }">
            <template v-if="hasGroupedOptions">
              <template
                v-for="group in options"
                :key="group.id"
              >
                <BSelectListOptionGroup
                  v-if="group.options.length"
                  :label="group.name"
                >
                  <BSelectListOption
                    v-for="option in group.options"
                    :key="option.id"
                    :variant="isCheckbox ? 'checkbox' : 'single'"
                    :option="option"
                    :selected="getIsSelected(option)"
                    :search="searchQuery"
                    @click="
                      select(option);
                      selectRef?.flash();
                      print(option);
                    "
                  />
                </BSelectListOptionGroup>
              </template>
            </template>
            <template v-else>
              <BSelectListOption
                v-for="option in options"
                :key="option.id"
                :variant="isCheckbox ? 'checkbox' : 'single'"
                :option="option"
                :selected="getIsSelected(option)"
                :search="searchQuery"
                @click="
                  select(option);
                  selectRef?.flash();
                  print(option);
                "
              />
            </template>
          </template>
        </BSelectList>
      </div>
    </template>
    <template #controls>
      <EventSection>
        <EventFlasher ref="selectRef" name="select" />
      </EventSection>
      <PropControlBoolean name="Multiselect" :value="isMultiSelect" @toggle="onToggleMultiSelect" />
      <PropControlBoolean name="Checkbox" :value="isCheckbox" @toggle="isCheckbox = !isCheckbox" />
      <PropControlBoolean name="Show icons" :value="showIcons" @toggle="showIcons = !showIcons" />
      <PropControlBoolean name="Group options" :value="hasGroupedOptions" @toggle="hasGroupedOptions = !hasGroupedOptions" />
      <PropControlBoolean name="Search function" :value="hasSearch" @toggle="hasSearch = !hasSearch" />
      <PropControlBoolean name="Filters" :value="hasFilters" @toggle="hasFilters = !hasFilters" />
      <PropControlBoolean name="Select All" :value="hasSelectAll" @toggle="hasSelectAll = !hasSelectAll">
        Mainly used in PopConfirm
      </PropControlBoolean>
    </template>
  </ComponentPage>
</template>
