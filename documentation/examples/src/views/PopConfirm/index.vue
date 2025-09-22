<script setup lang="ts">
import { BButton, BPopConfirm } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage>
    <BPopConfirm

      title="Delete this?"
      description="This cannot be undone. Do you wish to continue? Long day at work?"
      placement="bottom-start"
      @confirm="console.log('PopConfirm clicked confirm')"
      @cancel="console.log('PopConfirm clicked cancel')"
      @close="console.log('PopConfirm closed by clicking outside')"
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
