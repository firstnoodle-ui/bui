<script setup lang="ts">
import { BFilterChip } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlNumber,
  PropControlString,
} from "../../components";

const isActive = ref(false);
const isDeletable = ref(false);
const label = ref("Category");
const count = ref(0);
</script>

<template>
  <ComponentPage title="FilterChip">
    <template #default="{ print }">
      <BFilterChip
        :active="isActive"
        :deletable="isDeletable"
        :label="label"
        :count="count"
        @click="print('click')"
        @delete="print('delete')"
      />
    </template>
    <template #controls>
      <PropControlBoolean name="Active" :value="isActive" @toggle="isActive = !isActive" />
      <PropControlBoolean name="Deletable" :value="isDeletable" @toggle="isDeletable = !isDeletable" />
      <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
      <PropControlNumber name="Count" :value="count" @change="(value:number) => count = value" />
    </template>
  </ComponentPage>
</template>
