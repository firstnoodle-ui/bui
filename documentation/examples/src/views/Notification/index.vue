<script setup lang="ts">
import { BNotification } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage title="Notification">
    <template #default="{ print }">
      <BNotification
        type="default"
        icon="trash"
        text="Item deleted"
        show-details-button
        @show-details="print('@show-details')"
        @close="print('@close')"
      />
    </template>
  </ComponentPage>
</template>
