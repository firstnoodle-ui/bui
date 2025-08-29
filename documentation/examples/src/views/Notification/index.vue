<script setup lang="ts">
import { BNotification } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage title="Notification">
    <template #default="{ print }">
      <div
        class="flex w-96 flex-col gap-2"
      >
        <BNotification
          type="default"
          icon="trash"
          text="Item deleted"
          show-details-button
          @show-details="print('@show-details')"
          @close="print('@close')"
        />
        <BNotification
          type="default"
          icon="trash"
          text="This is a very very very very very very very very veryvery very very long text"
          show-details-button
          @show-details="print('@show-details')"
          @close="print('@close')"
        />
        <BNotification
          type="default"
          icon="trash"
          text="Item deleted"
          show-details-button
          @show-details="print('@show-details')"
          @close="print('@close')"
        />
      </div>
    </template>
  </ComponentPage>
</template>
