import type { Ref } from "vue";
import type { LocationQuery } from "vue-router";
import type { Filter, NestedKeyOf, ParsedSortingQuery, TypedSorting } from "../types";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getFiltersAndSortingFromQuery,
  removeFiltersFromQuery,
} from "../utils/queryFilters";

type FilterOptions<T, AllowedSortingFields extends NestedKeyOf<T>> = {
  groupId: string;
  filters: Filter<T>[];
  defaultSorting: TypedSorting<T, AllowedSortingFields>;
  sortingMethod?: (sorting: TypedSorting<T, AllowedSortingFields>, items: T[]) => T[];
  items?: Ref<T[]>;
  remoteFilterMethod?: (sorting: TypedSorting<T, AllowedSortingFields> | undefined, filters: Filter<T>[]) => Promise<T[]>;
};

export const useFilters = <T, AllowedSortingFields extends NestedKeyOf<T>>({ filters, groupId, items, remoteFilterMethod, defaultSorting, sortingMethod }: FilterOptions<T, AllowedSortingFields>) => {
  const route = useRoute();
  const router = useRouter();

  const activeSorting = ref<TypedSorting<T, AllowedSortingFields>>(defaultSorting);
  const availableFilters = ref<Filter<T>[]>(filters);
  const activeFilters = computed(() => availableFilters.value.filter(filter => Boolean(filter.value)));
  const filteringActive = computed(() => !!activeFilters.value.length);
  const loadingItems = ref(false);

  const filteredItems = ref<T[]>([]);

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
      filteredItems.value = sortingMethod
        ? sortingMethod(
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
    const { filters: filtersToBeUpdated, sorting } = getFiltersAndSortingFromQuery(routeQuery, groupId);

    activeSorting.value = sorting ? sortingQueryToTypedSorting(sorting) : defaultSorting;

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
    updateFilters,
  };
};
