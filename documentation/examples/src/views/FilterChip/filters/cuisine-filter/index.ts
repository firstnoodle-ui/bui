// export const groupId = "conversations";

import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "../../data";
import { getFilterValues, hasValue } from "@firstnoodle-ui/bui";
import CuisineFilter from "./CuisineFilter.vue";

export const cuisineFilter: Filter<Restaurant> = {
  component: CuisineFilter,
  data: {
    name: "Cuisine",
    id: "cuisine",
    tooltip: "Filter restaurants by cuisine",
    disabled: false,
    allowedOperators: ["="],
    operator: "=",
    field: "id",
    value: null,
    execute: (value, _operator, entity) => {
      if (typeof value !== "string" || !hasValue(entity.cuisine)) {
        throw new Error(`Invalid filter value ${value} [${typeof value}]`);
      };
      return getFilterValues(value).includes(entity.cuisine.toString());
    },
  },
};
