<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="HREF and MAILTO">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton tooltip="Click to open link" icon="open-link" type="primary" href="https://google.com" />
        <BButton tooltip="Click to send email" icon="envelope" type="primary" mailto="yolo@google.com" />
      </div>
    </section>
  </ComponentPageSection>
</template>
