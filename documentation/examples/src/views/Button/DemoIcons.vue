<script setup lang="ts">
import { BButton } from "@firstnoodle/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Icon & IconAfter">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton icon="envelope" label="Email" />
        <BButton icon="box" type="primary" />
        <BButton icon-after="chevron-down" label="Errors" type="error" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton bordered icon="envelope" label="Email" />
        <BButton bordered icon="download" type="primary" />
        <BButton bordered icon-after="chevron-down" label="Errors" type="error" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton solid icon="envelope" label="Email" />
        <BButton solid icon="download" type="primary" />
        <BButton solid icon-after="chevron-down" label="Errors" type="error" />
      </div>
    </section>
  </ComponentPageSection>
</template>
