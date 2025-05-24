<script setup lang="ts">
import { BNotification } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="Notification">
    <ComponentPageSection title="Show details button">
      <BNotification type="default" icon="trash" text="Item deleted" show-details-button />
    </ComponentPageSection>
  </ComponentPage>
</template>
