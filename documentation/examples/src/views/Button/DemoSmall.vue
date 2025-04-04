<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Small">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton small label="Default" />
        <BButton small bordered label="Primary" type="primary" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton small icon="box" label="Ship" />
        <BButton small bordered icon="download" label="Fetch" type="primary" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton small icon="popup" />
        <BButton small bordered icon="link" type="primary" />
      </div>
    </section>
  </ComponentPageSection>
</template>
