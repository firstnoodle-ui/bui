<script setup lang="ts">
import { BNotification } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="Notification">
    <ComponentPageSection title="Default">
      <BNotification text="Notified" />
    </ComponentPageSection>
    <ComponentPageSection title="Show details button">
      <BNotification text="Notified" show-details-button />
    </ComponentPageSection>
  </ComponentPage>
</template>
