<script setup lang="ts">
import { BButton, BPopConfirm } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage title="PopConfirm">
    <BPopConfirm
      title="Delete this?"
      description="This cannot be undone. Do you wish to continue? Long day at work?"
      placement="bottom-start"
    >
      <template #trigger="slotProps">
        <BButton
          icon="trash"
          label="Delete"
          variant="outlineSubtle"
          :focus="slotProps && slotProps.visible"
        />
      </template>
    </BPopConfirm>
  </ComponentPage>
</template>
