<script setup lang="ts">
import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "./data";
import { BFlexbox, BLoadSpinner, useFilters, useMountedAndRouterUpdate } from "@firstnoodle-ui/bui";
import { onMounted, ref } from "vue";
import { ComponentPage } from "../../components";
import { fetchRestaurants } from "./data";
import { restaurantFilterComponents, restaurantFilters } from "./filters";

const groupId = "restaurants";

const customFilterMethod = async (filters: Filter<Restaurant>[]) => {
  try {
    const response = await fetchRestaurants(filters);
    return response;
  }
  catch {
    return [];
  }
};

// Frontend filtering
// using the customFilterMethod in onMounted to simulate a scenario where the restaurants initially are loaded from an API,
// but subsequently filtered in the frontend. Thus the restaurants are passed in the 'items' field of the FilterOptions for useFilters
const restaurantData = ref<Restaurant[]>([]);
onMounted(async () => {
  try {
    restaurantData.value = await customFilterMethod([]);
  }
  catch {}
});

// 1. Frontend filtering: uncomment "items"
// 2. Backend filtering: uncomment "remoteFilterMethod"
const {
  availableFilters,
  filteredItems,
  loadingItems,
  updateFilters,
} = useFilters<Restaurant>({
  groupId,
  filters: restaurantFilters,
  items: restaurantData,
  // remoteFilterMethod: customFilterMethod,
});

// this is needed to sync router changes with the filters
useMountedAndRouterUpdate(updateFilters);
</script>

<template>
  <ComponentPage>
    <template #default>
      <BFlexbox class="gap-2">
        <component
          :is="restaurantFilterComponents[filter.component]"
          v-for="filter in availableFilters"
          :key="filter.id"
          :filter="filter"
          :group-id="groupId"
        />
      </BFlexbox>
      <section class="flex flex-col gap-2 py-8">
        <BLoadSpinner v-if="loadingItems" class="size-4" />
        <template v-else>
          <div v-for="restaurant in filteredItems" :key="restaurant.id">
            {{ restaurant.name }}
          </div>
        </template>
        <div v-if="!loadingItems && !filteredItems.length" class="italic text-tertiary text-sm">
          No restaurants matches filters
        </div>
      </section>
    </template>
  </ComponentPage>
</template>
