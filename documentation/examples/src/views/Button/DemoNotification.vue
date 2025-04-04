<script setup lang="ts">
import { BButton } from "@firstnoodle/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Notification">
    <section class="flex items-center">
      <div class="flex-1 flex items-center space-x-4">
        <BButton notification bordered icon="bell" label="Notifications" type="primary" />
        <BButton notification icon="filters" type="primary" />
      </div>
    </section>
  </ComponentPageSection>
</template>
