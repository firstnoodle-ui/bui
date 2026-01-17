import type { LocationQuery } from "vue-router";
import type { Filter, FilterOptions, NestedKeyOf, ParsedSortingQuery, TypedSorting } from "../types";
import { computed, onMounted, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import {
  getFiltersAndSortingFromQuery,
  removeFiltersFromQuery,
} from "../utils/queryFilters";

export const useFilters = <T, AllowedSortingFields extends NestedKeyOf<T>>({ groupId, filters, sorting, items, remoteFilterMethod }: FilterOptions<T, AllowedSortingFields>) => {
  const route = useRoute();
  const router = useRouter();

  onMounted(() => updateFilters(route.query));
  onBeforeRouteUpdate(to => updateFilters(to.query));

  const loadingItems = ref(false);
  const filteredItems = ref<T[]>([]);
  const availableFilters = ref<Filter<T>[]>(filters);
  const activeFilters = computed(() => availableFilters.value.filter(filter => Boolean(filter.value)));
  const filteringActive = computed(() => !!activeFilters.value.length);
  const activeSorting = ref<TypedSorting<T, AllowedSortingFields>>(sorting.default);

  const applyFilters = async () => {
    if (remoteFilterMethod && items) {
      throw new Error("You should only pass either 'items' (frontend filtering) or 'remoteFilterMethod' (backend filtering). You passed both.");
    }
    else if (!remoteFilterMethod && !items) {
      throw new Error("Filters have to have either items or remoteFilterMethod to work. None was provided.");
    }

    if (remoteFilterMethod) {
      try {
        loadingItems.value = true;
        const result = await remoteFilterMethod(activeSorting.value as TypedSorting<T, AllowedSortingFields>, activeFilters.value);
        filteredItems.value = result;
        loadingItems.value = false;
      }
      catch {
        loadingItems.value = false;
      }
    }
    else if (items) {
      filteredItems.value = sorting.sortingMethod
        ? sorting.sortingMethod(
            activeSorting.value as TypedSorting<T, AllowedSortingFields>,
            items.value.filter(item => activeFilters.value.every(f => f.execute(f.value, f.operator, item))),
          )
        : items.value.filter(item => activeFilters.value.every(f => f.execute(f.value, f.operator, item)));
    }
  };

  // Watch for changes in active filters and items, then reapply filtering
  const watchSources = items ? [activeSorting, activeFilters, items] : [activeSorting, activeFilters];
  watch(watchSources, () => applyFilters(), { immediate: true, deep: true });

  const updateFilters = (routeQuery: LocationQuery) => {
    const { filters: filtersToBeUpdated, sorting: sortingQuery } = getFiltersAndSortingFromQuery(routeQuery, groupId);

    activeSorting.value = sortingQuery ? sortingQueryToTypedSorting(sortingQuery) : sorting.default;

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

  const sortingQueryToTypedSorting = (query: ParsedSortingQuery): TypedSorting<T, AllowedSortingFields> => {
    return {
      direction: query.direction,
      field: query.field as AllowedSortingFields,
    };
  };

  return {
    activeFilters,
    activeSorting,
    availableFilters,
    filteringActive,
    filteredItems,
    loadingItems,
    applyFilters,
    clearFilters,
  };
};
