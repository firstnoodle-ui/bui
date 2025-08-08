<script setup lang="ts">
import { BDeleteButton } from "@firstnoodle-ui/bui";
import {
  ComponentPage,
} from "../../components";
</script>

<template>
  <ComponentPage title="Dialog">
    <template #default="{ print }">
      <BDeleteButton @click="print('@click')" />
    </template>
    <template #controls>
      <!-- <EventFlasher ref="clickFlasher" name="click" /> -->
      <EventFlasher name="click" />
    </template>
  </ComponentPage>
</template>
