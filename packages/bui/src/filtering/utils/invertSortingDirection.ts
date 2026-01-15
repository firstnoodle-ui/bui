import type { SortingDirection } from "../types";

export const invertSortingDirection = (currentDirection: SortingDirection): SortingDirection => {
  return currentDirection === "asc" ? "desc" : "asc";
};
