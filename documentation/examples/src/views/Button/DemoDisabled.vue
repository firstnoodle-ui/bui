<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Disabled">
    <section class="flex items-center gap-4">
      <BButton disabled label="Fill" />
      <BButton disabled variant="outline" label="Outline" />
      <BButton disabled variant="outlineSubtle" label="OutlineSubtle" />
      <BButton disabled variant="text" label="Text" />
      <BButton disabled variant="textSubtle" label="TextSubtle" />
      <BButton disabled variant="destructive" label="Destructive" />
    </section>
  </ComponentPageSection>
</template>
