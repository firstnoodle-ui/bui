import type { SelectListOption } from "../../components";
import type { FilterData, FilterValue } from "../types";
import { computed, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { filterValueSeparator } from "../config";
import { addFilterToQuery, removeFilterFromQuery } from "../utils/queryFilters";

// Composable with generic methods to be used across all filter components
export const useFilterComponent = <T>(groupId: string, filterData: FilterData<T>) => {
  const route = useRoute();
  const router = useRouter();

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useEmit must be called within a setup function.");
  }

  const clearFilter = () => handleFilterChange(null);

  const isActive = computed(() => Boolean(filterData.value) && !!filterData.value!.split(filterValueSeparator).length);
  const values = computed(() => filterData.value ? filterData.value.split(filterValueSeparator) : []);

  const updateFilter = (selection: SelectListOption[]) => {
    if (selection.length === 0) {
      clearFilter();
      return;
    }
    const newSelection = selection.map(o => o.id).join(filterValueSeparator);
    handleFilterChange(newSelection);
  };

  const handleFilterChange = async (value: FilterValue) => {
    let newQuery = removeFilterFromQuery(route.query, groupId, filterData.id);
    if (value) newQuery = addFilterToQuery(newQuery, groupId, filterData.id, filterData.operator, value);
    await router.push({ query: newQuery });
  };

  return { clearFilter, isActive, updateFilter, values };
};
