<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Rounded">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton bordered rounded icon="undo" label="Undo" type="primary" />
        <BButton small bordered rounded icon="eye" label="hide" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton bordered rounded icon="trash" type="primary" />
        <BButton small bordered rounded icon="chevron-right" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton rounded icon="link" type="primary" />
        <BButton small rounded icon="star" />
      </div>
    </section>
  </ComponentPageSection>
</template>
