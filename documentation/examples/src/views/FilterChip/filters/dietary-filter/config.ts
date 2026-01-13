import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "../../data";
import { getFilterValues, hasValue } from "@firstnoodle-ui/bui";
import { dietaryOptions } from "../../data";

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
    if (typeof value !== "string" || !hasValue(entity.dietaryOptionIds)) {
      throw new Error(`Invalid filter value ${value} [${typeof value}]`);
    };

    // when using "name" as identifier in url
    const dietaryOptionNames = getFilterValues(value);
    const dieataryOptionIds = dietaryOptions.filter(dietaryOption => dietaryOptionNames.includes(dietaryOption.name)).map(dietaryOption => dietaryOption.id);
    return dieataryOptionIds.some(d => entity.dietaryOptionIds.includes(d));

    // when using "id" as identifier in url
    // const dietaryOptionIds = getFilterValues(value);
    // return dietaryOptionIds.some(id => entity.dietaryOptionIds.includes(Number.parseInt(id)));
  },
};
