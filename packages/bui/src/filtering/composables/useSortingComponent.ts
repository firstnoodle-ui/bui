import type { ParsedSortingQuery } from "../types";
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
import { addSortingToQuery, removeSortingFromQuery } from "../utils/queryFilters";

// Composable with generic methods to be used across all filter components
export const useSortingComponent = (groupId: string) => {
  const route = useRoute();
  const router = useRouter();

  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error("useEmit must be called within a setup function.");
  }

  const updateSorting = async (newSorting: ParsedSortingQuery) => {
    let newQuery = removeSortingFromQuery(route.query, groupId);
    newQuery = addSortingToQuery(newQuery, groupId, newSorting.direction, newSorting.field);
    await router.push({ query: newQuery });
  };

  return { updateSorting };
};
