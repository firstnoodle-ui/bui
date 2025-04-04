<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Types & Styles (bordered, solid)">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton label="Default" />
        <BButton label="Primary" type="primary" />
        <BButton label="Error" type="error" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton bordered label="Default" />
        <BButton bordered type="primary" label="Primary" />
        <BButton bordered type="error" label="Error" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton solid label="Default" />
        <BButton solid label="Primary" type="primary" />
        <BButton solid type="error" label="Error" />
      </div>
    </section>
  </ComponentPageSection>
</template>
