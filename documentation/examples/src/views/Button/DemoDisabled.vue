<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Disabled">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton disabled bordered icon="link" label="Save" type="primary" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton disabled solid icon="link" label="Save" type="primary" />
      </div>
    </section>
  </ComponentPageSection>
</template>
