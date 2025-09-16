<script setup lang="ts">
import { BPagination } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlNumber,
  PropControlSelect,
} from "../../components";

// PropControl state
const borders = ref(true);
const currentPage = ref(2);
const lastPage = ref(10);
const orientation = ref<"horizontal" | "vertical">("horizontal");

const orientationOptions = ["horizontal", "vertical"];

const onChange = (page: number) => {
  currentPage.value = page;
};
</script>

<template>
  <ComponentPage title="Pagination">
    <template #default="{ print }">
      <BPagination
        :borders="borders"
        :current-page="currentPage"
        :last-page="lastPage"
        :orientation="orientation"
        @change="
          onChange($event);
          print(`Page changed to: ${$event}`)
        "
      />
    </template>
    <template #controls>
      <PropControlBoolean name="Borders" :value="borders" @toggle="borders = !borders">
        Show borders around pagination buttons
      </PropControlBoolean>
      <PropControlNumber name="Current page" :value="currentPage" @change="(value: number) => currentPage = Math.max(1, Math.min(value, lastPage))">
        Currently active page number
      </PropControlNumber>
      <PropControlNumber name="Last page" :value="lastPage" @change="(value: number) => { lastPage = Math.max(1, value); if (currentPage > value) currentPage = value; }">
        Total number of pages
      </PropControlNumber>
      <PropControlSelect name="Orientation" :value="orientation" :options="orientationOptions" @select="(option: 'horizontal' | 'vertical') => orientation = option">
        Direction of pagination controls
      </PropControlSelect>
    </template>
  </ComponentPage>
</template>
