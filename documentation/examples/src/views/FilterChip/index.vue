<script setup lang="ts">
import type { Restaurant } from "./data";
import { useFilters, useMountedAndRouterUpdate } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlNumber,
  PropControlString,
} from "../../components";
import { restaurants } from "./data";
import { restaurantFilters } from "./filters";

const isActive = ref(false);
const isDeletable = ref(false);
const label = ref("Category");
const count = ref(0);

const rest = ref<Restaurant[]>(restaurants);

const groupId = "restaurants";
const { availableFilters, filteredItems, updateFilters } = useFilters<Restaurant>(groupId, restaurantFilters, rest);
useMountedAndRouterUpdate(updateFilters);
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <component
        :is="filter.component"
        v-for="filter in availableFilters"
        :key="filter.data.id"
        :filter="filter.data"
        :group-id="groupId"
      />
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
