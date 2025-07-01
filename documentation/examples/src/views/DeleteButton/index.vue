<script setup lang="ts">
import { BDeleteButton } from "@firstnoodle-ui/bui";
import { ref } from "vue";
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
      <EventFlasher ref="clickFlasher" name="click" />
    </template>
  </ComponentPage>
</template>
