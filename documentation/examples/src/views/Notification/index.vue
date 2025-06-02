<script setup lang="ts">
import { BButton, BNotification } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import InputText from "./InputText.vue";
import { notificationsEventBus } from "./notifications-event-bus";

const keys = {
  inputTextA: "C8FF9E72-27EB-4A7D-A4BB-04BD686538A0",
  inputTextB: "C8FF9E72-27EB-4A7D-A4BB-04BD686538A1",
};
</script>

<template>
  <ComponentPage title="Notification">
    <ComponentPageSection title="Show details button">
      <BNotification type="default" icon="trash" text="Item deleted" show-details-button />
    </ComponentPageSection>
    <ComponentPageSection title="Validate input length">
      <div class="flex flex-col gap-4">
        <div>
          <BButton label="Validate" @click="notificationsEventBus.emit('validate', Object.values(keys))" />
        </div>
        <div class="flex flex-col gap-4">
          <InputText :id="keys.inputTextA" :max-length="50" default-value="min 50 chars" />
          <InputText :id="keys.inputTextB" :max-length="2" default-value="min 2 chars" />
        </div>
      </div>
    </ComponentPageSection>
  </ComponentPage>
</template>
