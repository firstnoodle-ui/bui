import type { NestedKeyOf, TypedSorting } from "../types";
/**
 * Sorts an array of objects by a given field, automatically detecting the field type (string, number, or date)
 */
export function sortByField<T extends Record<string, any>, AllowedSortingFields extends NestedKeyOf<T>>(
  sorting: TypedSorting<T, AllowedSortingFields>,
  items: T[],
): T[] {
  if (!items || items.length === 0) {
    return items;
  }

  const sortedItems = [...items].sort((a, b) => {
    const aValue = a[sorting.field];
    const bValue = b[sorting.field];

    // Handle null/undefined values - push them to the end
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return 1;
    if (bValue == null) return -1;

    // Detect type and compare accordingly
    const aType = typeof aValue;
    const bType = typeof bValue;

    // Number comparison
    if (aType === "number" && bType === "number") {
      return aValue - bValue;
    }

    // Date comparison (check if valid date objects or date strings)
    const aIsDate = (aValue as any) instanceof Date;
    const bIsDate = (bValue as any) instanceof Date;

    if (aIsDate && bIsDate) {
      return (aValue as Date).getTime() - (bValue as Date).getTime();
    }

    // Try to parse as dates
    const aDateMs = new Date(aValue as any).getTime();
    const bDateMs = new Date(bValue as any).getTime();

    if (!Number.isNaN(aDateMs) && !Number.isNaN(bDateMs)) {
      return aDateMs - bDateMs;
    }

    // String comparison (case-insensitive)
    const aString = String(aValue).toLowerCase();
    const bString = String(bValue).toLowerCase();

    return aString.localeCompare(bString);
  });

  // Reverse if descending
  return sorting.direction === "desc" ? sortedItems.reverse() : sortedItems;
}
