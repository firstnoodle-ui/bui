<script setup lang="ts">
import type { Filter, TypedSorting } from "@firstnoodle-ui/bui";
import type { RestaurantDto } from "./data";
import type { AllowedSortingFields } from "./filters/sort-items/config";
import { BFlexbox, BIcon, BLoadSpinner, useFilters } from "@firstnoodle-ui/bui";
import { onMounted, ref } from "vue";
import { ComponentPage } from "../../components";
import { fetchRestaurants } from "./data";
import { restaurantFilterComponents, restaurantFilters } from "./filters";
import { sortingConfig } from "./filters/sort-items/config";
import SortItems from "./filters/sort-items/SortItems.vue";

const groupId = "restaurants" as const;

const customFilterMethod = async (sorting: TypedSorting<RestaurantDto, AllowedSortingFields> | undefined, filters: Filter<RestaurantDto>[]) => {
  try {
    const response = await fetchRestaurants(sorting, filters);
    return response;
  }
  catch {
    return [];
  }
};

// Frontend filtering
// using the customFilterMethod in onMounted to simulate a scenario where the restaurants initially are loaded from an API,
// but subsequently filtered in the frontend. Thus the restaurants are passed in the 'items' field of the FilterOptions for useFilters

const restaurantData = ref<RestaurantDto[]>([]);
onMounted(async () => {
  try {
    restaurantData.value = await customFilterMethod({ field: "rating", direction: "asc" }, []);
  }
  catch {}
});

// 1. Frontend filtering: uncomment "items"
// 2. Backend filtering: uncomment "remoteFilterMethod"
const {
  availableFilters,
  activeSorting,
  filteredItems,
  loadingItems,
} = useFilters<RestaurantDto, AllowedSortingFields>({
  groupId,
  filters: restaurantFilters,
  sorting: sortingConfig,
  items: restaurantData,
  // remoteFilterMethod: customFilterMethod,
});
</script>

<template>
  <ComponentPage>
    <template #default>
      <BFlexbox class="gap-2" justify="between">
        <BFlexbox class="gap-2">
          <div class="text-sm text-tertiary">
            Filters
          </div>
          <component
            :is="restaurantFilterComponents[filter.component]"
            v-for="filter in availableFilters"
            :key="filter.id"
            :filter="filter"
            :group-id="groupId"
          />
        </BFlexbox>
        <BFlexbox class="gap-2">
          <div class="text-sm text-tertiary">
            Sort by
          </div>
          <SortItems :group-id="groupId" :sorting="activeSorting" />
        </BFlexbox>
      </BFlexbox>
      <section class="flex flex-col gap-2 py-8">
        <BLoadSpinner v-if="loadingItems" class="size-4" />
        <template v-else>
          <BFlexbox v-for="restaurant in filteredItems" :key="restaurant.id" justify="between" class="w-full">
            <BFlexbox class="">
              <span class="font-bold text-secondary w-56">{{ restaurant.name }}</span>
              <span class="font-light text-tertiary">{{ restaurant.cuisine.name }}</span>
            </BFlexbox>
            <BFlexbox class="gap-8">
              <span class="text-xs text-amber-500">{{ restaurant.priceRange }}</span>
              <BFlexbox class="w-10 gap-1">
                <BIcon name="star" class="text-muted" />
                <span class="text-right text-sm">{{ restaurant.rating.toFixed(1) }}</span>
              </BFlexbox>
            </BFlexbox>
          </BFlexbox>
        </template>
        <div v-if="!loadingItems && !filteredItems.length" class="italic text-tertiary text-sm">
          No restaurants matches filters
        </div>
      </section>
    </template>
  </ComponentPage>
</template>
