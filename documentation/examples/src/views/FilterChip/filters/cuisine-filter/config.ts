import type { Filter } from "@firstnoodle-ui/bui";
import type { RestaurantDto } from "../../data";
import { getFilterValues, hasValue } from "@firstnoodle-ui/bui";

// import { cuisines } from "../../data";

export const cuisineFilter: Filter<RestaurantDto> = {
  id: "cuisineId",
  name: "Cuisine",
  component: "CuisineFilter",
  tooltip: "Filter restaurants by cuisine",
  disabled: false,
  allowedOperators: ["="],
  operator: "=",
  value: null,
  execute: (value, _operator, entity) => {
    if (typeof value !== "string" || !hasValue(entity.cuisine)) {
      throw new Error(`Invalid filter value ${value} [${typeof value}]`);
    };

    // filtering by cuisine name
    // const cuisineNames = getFilterValues(value);
    // const cuisineIds = cuisines.filter(cuisine => cuisineNames.includes(cuisine.name)).map(cuisine => cuisine.id);
    // return cuisineIds.includes(entity.cuisine);

    // for filtering by cuisine id
    const cuisineIds = getFilterValues(value);
    return cuisineIds.includes(entity.cuisine.id.toString());
  },
};
