import type { Ref } from "vue";
import type { LocationQuery } from "vue-router";
import type { Filter } from "../types";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getFiltersFromQuery,
  removeFiltersFromQuery,
} from "../utils/queryFilters";

export const useFilters = <T>(groupId: string, filters: Filter<T>[], items: Ref<T[]>, filterMethod: ((filters: Filter<T>[]) => T[]) | null = null) => {
  const route = useRoute();
  const router = useRouter();

  const availableFilters = ref<Filter<T>[]>(filters);

  const activeFilters = computed(() =>
    availableFilters.value.filter(filter => Boolean(filter.value)),
  );

  const filteringActive = computed(() => !!activeFilters.value.length);

  const filteredItems = computed(() => {
    if (filterMethod) {
      const result = filterMethod(activeFilters.value);
      return result;
    }
    return items.value.filter(item =>
      activeFilters.value.every(f => f.execute(f.value, f.operator, item)),
    );
  });

  const updateFilters = (routeQuery: LocationQuery) => {
    const filtersToBeUpdated = getFiltersFromQuery(routeQuery, groupId);
    (availableFilters.value as Filter<T>[]).forEach((filter) => {
      const updatedFilter = filtersToBeUpdated.find(f => f.id === filter.id);
      if (updatedFilter) {
        filter.operator = updatedFilter.operator;
        filter.value = updatedFilter.value;
      }
      else {
        filter.operator = "=";
        filter.value = null;
      }
    });
  };

  const clearFilters = async () => {
    const newQuery = removeFiltersFromQuery(route.query, groupId);
    await router.push({ query: newQuery });
  };

  return {
    activeFilters,
    availableFilters,
    filteringActive,
    filteredItems,
    clearFilters,
    updateFilters,
  };
};
