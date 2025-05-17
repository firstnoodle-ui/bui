<script setup lang="ts">
import { ref } from "vue";
import { BDeleteButton } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import EventFlasher from "../../components/EventFlasher.vue";

const clickFlasher = ref<typeof EventFlasher>();
</script>

<template>
  <ComponentPage title="Dialog">
    <ComponentPageSection title="Basic usage">
      <BDeleteButton @click="clickFlasher?.flash()" />
      <template #controls>
        <EventFlasher ref="clickFlasher" name="click" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
