<script setup lang="ts">
import { BFilterChip } from "@firstnoodle/bui";
import { ref } from "vue";
import {
  ComponentPage,
  ComponentPageSection,
  EventFlasher,
  EventSection,
  PropControlBoolean,
  PropControlNumber,
  PropControlString,
} from "../../components";

const clickFlasher = ref<typeof EventFlasher>();
const deleteFlasher = ref<typeof EventFlasher>();

const isActive = ref(false);
const label = ref("Category");
const count = ref(0);
</script>

<template>
  <ComponentPage title="FilterChip">
    <ComponentPageSection title="Basic usage">
      <BFilterChip :active="isActive" :label="label" :count="count" @click="clickFlasher?.flash()" @delete="deleteFlasher?.flash()" />
      <template #controls>
        <EventSection>
          <EventFlasher ref="clickFlasher" name="click" />
          <EventFlasher ref="deleteFlasher" name="delete" />
        </EventSection>
        <PropControlBoolean name="Active" :value="isActive" @toggle="isActive = !isActive" />
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <PropControlNumber name="Count" :value="count" @change="(value:number) => count = value" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
