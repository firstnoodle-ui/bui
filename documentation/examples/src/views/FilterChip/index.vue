<script setup lang="ts">
import type { Filter } from "@firstnoodle-ui/bui";
import type { Restaurant } from "./data";
import { BFlexbox, filterValueSeparator, useFilters, useMountedAndRouterUpdate } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlNumber,
  PropControlString,
} from "../../components";
import { restaurants } from "./data";
import { restaurantFilterComponents, restaurantFilters } from "./filters";

const isActive = ref(false);
const isDeletable = ref(false);
const label = ref("Category");
const count = ref(0);

const restaurantData = ref<Restaurant[]>(restaurants);

// Custom filter function that can be passed as 4th param in useFilters - will be called automatically when filters change
// const customFilter = (filters: Filter<Restaurant>[]) => {
//   // call API
//   return [] as Restaurant[];
// };

const groupId = "restaurants";
const { availableFilters, filteredItems, updateFilters } = useFilters<Restaurant>(groupId, restaurantFilters, restaurantData);
useMountedAndRouterUpdate(updateFilters);
</script>

<template>
  <ComponentPage>
    <template #default>
      <BFlexbox class="gap-2">
        <component
          :is="restaurantFilterComponents[filter.component]"
          v-for="filter in availableFilters"
          :key="filter.id"
          :filter="filter"
          :group-id="groupId"
        />
      </BFlexbox>
      <section class="flex flex-col gap-2 py-8">
        <div v-for="restaurant in filteredItems" :key="restaurant.id">
          {{ restaurant.name }}
        </div>
      </section>
    </template>
    <template #controls>
      <PropControlBoolean name="Active" :value="isActive" @toggle="isActive = !isActive" />
      <PropControlBoolean name="Deletable" :value="isDeletable" @toggle="isDeletable = !isDeletable" />
      <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
      <PropControlNumber name="Count" :value="count" @change="(value:number) => count = value" />
    </template>
  </ComponentPage>
</template>
