import type { Ref } from "vue";
import type { LocationQuery } from "vue-router";
import type { Filter } from "../types";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getFiltersFromQuery,
  removeFiltersFromQuery,
} from "../utils/queryFilters";

export const useFilters = <T>(groupId: string, filters: Filter<T>[], items: Ref<T[]>) => {
  const route = useRoute();
  const router = useRouter();

  const availableFilters = ref<Filter<T>[]>(filters);

  const activeFilters = computed(() =>
    availableFilters.value.filter(filter => Boolean(filter.data.value)),
  );

  const updateFilters = (routeQuery: LocationQuery) => {
    const filtersToBeUpdated = getFiltersFromQuery(routeQuery, groupId);
    (availableFilters.value as Filter<T>[]).forEach((filter) => {
      const updatedFilter = filtersToBeUpdated.find(f => f.id === filter.data.id);
      if (updatedFilter) {
        filter.data.operator = updatedFilter.operator;
        filter.data.value = updatedFilter.value;
      }
      else {
        filter.data.operator = "=";
        filter.data.value = null;
      }
    });
  };

  const clearFilters = async () => {
    const newQuery = removeFiltersFromQuery(route.query, groupId);
    await router.push({ query: newQuery });
  };

  const filteringActive = computed(() => !!activeFilters.value.length);
  const filteredItems = computed(() => {
    return items.value.filter(item =>
      activeFilters.value.every(f => f.data.execute(f.data.value, f.data.operator, item)),
    );
  });

  return {
    activeFilters,
    availableFilters,
    filteringActive,
    filteredItems,
    clearFilters,
    updateFilters,
  };
};
