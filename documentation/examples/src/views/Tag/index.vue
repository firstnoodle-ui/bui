<script setup lang="ts">
import { BFlexbox, BTag } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="Tag">
    <ComponentPageSection title="Basic usage">
      <BFlexbox class="gap-2">
        <BTag label="ChatGPT 40." @delete="console.log('delete!')" />
        <BTag icon="venn" label="Mixed" @delete="console.log('delete!')" />
      </BFlexbox>
    </ComponentPageSection>
  </ComponentPage>
</template>
