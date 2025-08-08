<script setup lang="ts">
import { BPagination } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const currentPage1 = ref(2);

const onChange1 = (page: number) => {
  currentPage1.value = page;
};
</script>

<template>
  <ComponentPage title="Pagination">
    <BPagination borders :current-page="currentPage1" :last-page="5" @change="onChange1" />
  </ComponentPage>
</template>
