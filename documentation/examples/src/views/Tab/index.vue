<script setup lang="ts">
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import DefaultExample from "./DefaultExample.vue";
import PillExample from "./PillExample.vue";
</script>

<template>
  <ComponentPage title="Tab">
    <ComponentPageSection title="Default type">
      <DefaultExample />
    </ComponentPageSection>
    <ComponentPageSection title="Pill type">
      <PillExample />
    </ComponentPageSection>
  </ComponentPage>
</template>
