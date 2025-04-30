<script setup lang="ts">
import { BButton } from "@firstnoodle/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Icon & IconAfter">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton icon="envelope" label="Email" />
        <BButton variant="outline" icon="box" />
        <BButton variant="textSubtle" icon-after="chevron-down" label="Errors" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton rounded icon="envelope" label="Email" />
        <BButton rounded variant="outline" icon="download" />
        <BButton rounded variant="destructive" icon-after="chevron-down" label="Errors" />
      </div>
      <div class="flex-1 flex items-center space-x-4">
        <BButton small icon="envelope" label="Email" />
        <BButton small variant="outline" icon="download" />
        <BButton small variant="textSubtle" icon-after="chevron-down" label="Errors" />
      </div>
    </section>
  </ComponentPageSection>
</template>
