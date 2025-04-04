<!-- eslint-disable no-console -->
<script setup lang="ts">
import { BConfirmCancel } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const onCancel = () => console.log("cancel");
const onConfirm = () => console.log("confirm");
</script>

<template>
  <ComponentPage title="ConfirmCancel">
    <ComponentPageSection title="ConfirmCancel">
      <div class="w-1/3">
        <BConfirmCancel
          small
          cancel-button-is-text
          confirm-icon="check"
          confirm-label="Save"
          :save-disabled="false"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
    </ComponentPageSection>
  </ComponentPage>
</template>
