// export const groupId = "conversations";

import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "../../data";
import { getFilterValues, hasValue } from "@firstnoodle-ui/bui";
import { shallowRef } from "vue";
import CuisineFilter from "./CuisineFilter.vue";

export const cuisineFilter: Filter<Restaurant, "id"> = {
  name: "Cuisine Filter",
  id: "cuisine",
  component: shallowRef(CuisineFilter),
  tooltip: "Filter restaurants by cuisine",
  disabled: false,
  allowedOperators: ["="],
  operator: "=",
  field: "id",
  value: null,
  execute: (value, _operator, entity) => {
    if (typeof value !== "string" || !hasValue(entity.agent_configuration_id)) return false;
    return getFilterValues(value).includes(entity.agent_configuration_id.toString());
  },
};
