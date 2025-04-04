<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Tooltip">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton tooltip="Click to see notifications" bordered icon="bell" label="Notifications" type="primary" />
        <BButton tooltip="New email" icon="envelope" type="primary" />
      </div>
    </section>
  </ComponentPageSection>
</template>
