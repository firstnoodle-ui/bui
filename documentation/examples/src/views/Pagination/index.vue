<script setup lang="ts">
import { BPagination } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const currentPage1 = ref(2);

const onChange1 = (page: number) => {
  currentPage1.value = page;
};

const currentPage2 = ref(2);

const onChange2 = (page: number) => {
  currentPage2.value = page;
};
</script>

<template>
  <ComponentPage title="Pagination">
    <ComponentPageSection title="Default">
      <BPagination borders :current-page="currentPage1" :last-page="5" @change="onChange1" />
    </ComponentPageSection>
    <ComponentPageSection title="No borders">
      <BPagination :current-page="currentPage2" :last-page="5" @change="onChange2" orientation="vertical" />
    </ComponentPageSection>
  </ComponentPage>
</template>
