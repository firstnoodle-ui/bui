<script setup lang="ts">
import { computed, ref } from "vue";
import { BSelectList, BSelectListOption, type SelectListOption } from "@firstnoodle-ui/bui";
import {
  ComponentPage,
  ComponentPageSection,
  EventFlasher,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";
import { options, filters } from "./data";

const selectRef = ref<typeof EventFlasher>();

const selected = ref<SelectListOption[]>([]);
const updateSelection = (selection:SelectListOption[]) => selected.value = [...selection];

// search related
const searchQuery = ref('');
const onSearch = (query:string) => searchQuery.value = query;
const computedOptions = computed(() => {
    if(searchQuery.value.length) {
        return options.filter(option => option.label.toLowerCase().includes(searchQuery.value.toLowerCase()));
    }
    return options;
})

const hasSelectAll = ref(false);
</script>

<template>
  <ComponentPage title="SelectList">
    <ComponentPageSection title="Basic usage">
        <BSelectList
            :select-all="hasSelectAll"
            :search-function="onSearch"
            :options="computedOptions"
            :filters="filters"
            :selected="selected"
            @select="updateSelection"
        >
            <template #options="{ options, select, getIsSelected }">
                <BSelectListOption
                    v-for="option in options"
                    :key="option.id"
                    variant="checkbox"
                    :option="option"
                    :selected="getIsSelected(option)"
                    :search="searchQuery"
                    @click="
                        select(option);
                        selectRef?.flash();
                    "
                />
            </template>
        </BSelectList>
      <template #controls>
        <section class="flex items-center justify-end gap-2 mb-8">
          <div class="text-sm font-bold">
            Events
          </div>
          <EventFlasher ref="selectRef" name="select" />
          <!-- <EventFlasher ref="cancelRef" name="cancel" /> -->
        </section>
        <PropControlBoolean name="Select All" :value="hasSelectAll" @toggle="hasSelectAll = !hasSelectAll">
          Mainly used in PopConfirm
        </PropControlBoolean>
        <!-- <PropControlBoolean name="Small" :value="small" @toggle="small = !small" />
        <PropControlString name="Confirm label" :value="confirmLabel" @change="(value:string) => confirmLabel = value" />
        <PropControlSelect name="Order" :value="selectedOrder" :options="[...orderOptions]" @select="(option:string) => selectedOrder = option" /> -->
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
