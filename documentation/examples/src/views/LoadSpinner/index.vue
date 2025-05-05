<script setup lang="ts">
import { BLoadSpinner } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="LoadSpinner">
    <ComponentPageSection title="Basic usage">
      <BLoadSpinner class="w-4 h-4" />
    </ComponentPageSection>
  </ComponentPage>
</template>
