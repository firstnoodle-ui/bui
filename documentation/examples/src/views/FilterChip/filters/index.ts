import type { Filter } from "@firstnoodle-ui/bui";
import type { Component } from "vue";
import type { Restaurant } from "../data";
import { cuisineFilter } from "./cuisine-filter/config";
import CuisineFilter from "./cuisine-filter/CuisineFilter.vue";
import { dietaryFilter } from "./dietary-filter/config";
import DietaryFilter from "./dietary-filter/DietaryFilter.vue";

export const restaurantFilters: Filter<Restaurant>[] = [
  cuisineFilter,
  dietaryFilter,
];

export const restaurantFilterComponents: Record<string, Component> = {
  CuisineFilter,
  DietaryFilter,
};
