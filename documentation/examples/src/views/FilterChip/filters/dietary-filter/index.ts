import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "../../data";
import { getFilterValues, hasValue } from "@firstnoodle-ui/bui";

export const dietaryFilter: Filter<Restaurant> = {
  id: "dietary-options",
  name: "Dietary Options",
  component: "DietaryFilter",
  tooltip: "Filter restaurants by dietary options",
  disabled: false,
  allowedOperators: ["="],
  operator: "=",
  value: null,
  execute: (value, _operator, entity) => {
    if (typeof value !== "string" || !hasValue(entity.dietaryOptions)) {
      throw new Error(`Invalid filter value ${value} [${typeof value}]`);
    };

    // filtering by cuisine name
    // const values = getFilterValues(value);
    // const cuisineIds = cuisines.filter(c => values.includes(c.name)).map(c => c.id);
    // return cuisineIds.includes(entity.cuisine);

    // for filtering by cuisine id
    const values = getFilterValues(value);
    return values.some(v => entity.dietaryOptions.includes(Number.parseInt(v)));
  },
};
