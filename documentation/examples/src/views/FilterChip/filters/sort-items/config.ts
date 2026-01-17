import type { TypedSorting } from "@firstnoodle-ui/bui";
import type { RestaurantDto } from "../../data";
import { sortByField } from "@firstnoodle-ui/bui";

export type AllowedSortingFields = "name" | "cuisine.name" | "rating" | "priceRange";

export const sortRestaurants = (sorting: TypedSorting<RestaurantDto, AllowedSortingFields>, items: RestaurantDto[]): RestaurantDto[] => {
  // custom implementations
  if (sorting.field === "cuisine.name") {
    const sorted = [...items].sort((a, b) => {
      return a.cuisine.name > b.cuisine.name ? 1 : -1;
    });
    return sorting.direction === "desc" ? sorted.reverse() : sorted;
  }
  if (sorting.field === "priceRange") {
    const sorted = [...items].sort((a, b) => {
      return a.priceRange.length - b.priceRange.length;
    });
    return sorting.direction === "desc" ? sorted.reverse() : sorted;
  }

  // default implementation
  return sortByField<RestaurantDto>(sorting, items);
};
