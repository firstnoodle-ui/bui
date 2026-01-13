<script setup lang="ts">
import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "./data";
import { BFlexbox, BLoadSpinner, useFilters, useMountedAndRouterUpdate } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import { ComponentPage } from "../../components";
import { fetchRestaurants, restaurants } from "./data";
import { restaurantFilterComponents, restaurantFilters } from "./filters";

const restaurantData = ref<Restaurant[]>(restaurants);

const customFilterMethod = async (filters: Filter<Restaurant>[]) => {
  try {
    const response = await fetchRestaurants(filters);
    return response;
  }
  catch {
    return [];
  }
};

const groupId = "restaurants";

const {
  availableFilters,
  filteredItems,
  loadingItems,
  updateFilters,
} = useFilters<Restaurant>(groupId, restaurantFilters, restaurantData, customFilterMethod);

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
