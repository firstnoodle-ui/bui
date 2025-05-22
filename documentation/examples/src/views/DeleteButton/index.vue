<script setup lang="ts">
import { ref } from "vue";
import { BDeleteButton } from "@firstnoodle-ui/bui";
import { 
  ComponentPage,
  ComponentPageSection,
  EventFlasher,
} from "../../components";

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
