<script setup lang="ts">
import { BTag } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="Tag">
    <ComponentPageSection title="Basic usage">
      <BTag deletable icon="index-finger-up" label="remember" @delete="console.log('delete!')" />
    </ComponentPageSection>
  </ComponentPage>
</template>
