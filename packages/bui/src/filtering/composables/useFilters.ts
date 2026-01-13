import type { Ref } from "vue";
import type { LocationQuery } from "vue-router";
import type { Filter } from "../types";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getFiltersFromQuery,
  removeFiltersFromQuery,
} from "../utils/queryFilters";

export const useFilters = <T>(groupId: string, filters: Filter<T>[], items: Ref<T[]>, filterMethod: ((filters: Filter<T>[]) => Promise<T[]>) | null = null) => {
  const route = useRoute();
  const router = useRouter();

  const availableFilters = ref<Filter<T>[]>(filters);
  const activeFilters = computed(() => availableFilters.value.filter(filter => Boolean(filter.value)));
  const filteringActive = computed(() => !!activeFilters.value.length);
  const loadingItems = ref(false);

  const filteredItems = ref<T[]>([]);

  const applyFilters = async () => {
    if (filterMethod) {
      try {
        loadingItems.value = true;
        const result = await filterMethod(activeFilters.value);
        filteredItems.value = result;
        loadingItems.value = false;
      }
      catch {
        loadingItems.value = false;
      }
    }
    else {
      filteredItems.value = items.value.filter(item =>
        activeFilters.value.every(f => f.execute(f.value, f.operator, item)),
      );
    }
  };

  // Watch for changes in active filters and reapply filtering
  watch(activeFilters, () => applyFilters(), { immediate: true, deep: true });

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
    loadingItems,
    applyFilters,
    clearFilters,
    updateFilters,
  };
};
