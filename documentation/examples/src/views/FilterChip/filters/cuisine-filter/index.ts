// export const groupId = "conversations";

import { shallowRef } from "vue";
import { type Filter, getFilterValues, hasValue } from "@firstnoodle-ui/bui";
import type { Restaurant } from "../../data";
import CuisineFilter from "./CuisineFilter.vue";

export const cuisineFilter:Filter<Restaurant, "id"> = {
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
  }
};
