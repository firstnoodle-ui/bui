import type { Filter, FilterValue } from "../types";
import { computed, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterValueSeparator } from "../config";
import { addFilterToQuery, removeFilterFromQuery } from "../utils/queryFilters";

// Composable with generic methods to be used across all filter components
export const useFilterComponent = <T>(groupId: string, filter: Filter<T>) => {
  const route = useRoute();
  const router = useRouter();

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useEmit must be called within a setup function.");
  }

  const clearFilter = () => handleFilterChange(null);

  const isActive = computed(() => Boolean(filter.value) && !!filter.value!.split(filterValueSeparator).length);
  const values = computed(() => filter.value ? filter.value.split(filterValueSeparator) : []);

  const updateFilter = (selection: string[]) => {
    if (selection.length === 0) {
      clearFilter();
      return;
    }
    const newSelection = selection.join(filterValueSeparator);
    handleFilterChange(newSelection);
  };

  const handleFilterChange = async (value: FilterValue) => {
    let newQuery = removeFilterFromQuery(route.query, groupId, filter.id);
    if (value) newQuery = addFilterToQuery(newQuery, groupId, filter.id, filter.operator, value);
    await router.push({ query: newQuery });
  };

  return { clearFilter, isActive, updateFilter, values };
};
