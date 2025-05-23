<script setup lang="ts">
import { BDeleteButton } from "@firstnoodle-ui/bui";
import { ref } from "vue";
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
