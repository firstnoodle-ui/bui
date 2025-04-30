<script setup lang="ts">
import { BButton } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Variants">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton label="Fill" />
        <BButton variant="outline" label="Outline" />
        <BButton variant="outlineSubtle" label="OutlineSubtle" />
        <BButton variant="text" label="Text" />
        <BButton variant="textSubtle" label="TextSubtle" />
        <BButton focus variant="destructive" label="Destructive" />
      </div>
    </section>
  </ComponentPageSection>
  <ComponentPageSection title="Small">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton small label="Fill" />
        <BButton small variant="outline" label="Outline" />
        <BButton small variant="outlineSubtle" label="OutlineSubtle" />
        <BButton small variant="text" label="Text" />
        <BButton small variant="textSubtle" label="TextSubtle" />
        <BButton small variant="destructive" label="Destructive" />
      </div>
    </section>
  </ComponentPageSection>
</template>
