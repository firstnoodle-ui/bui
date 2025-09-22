<script setup lang="ts">
import type { TIcon } from "@firstnoodle-ui/bui";
import { BInputNumber, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";

import {
  ComponentPage,
  PropControlBoolean,
  PropControlNumber,
  PropControlSelect,
  PropControlString,
} from "../../components";

const value = ref(0);
const placeholder = ref("Age");
const selectedIcon = ref<string | undefined>();
const min = ref(0);
const max = ref(10);

const clearable = ref(false);
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BInputNumber
        :value="value"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :clearable="clearable"
        :min="min"
        :max="max"
        class="w-30"
        @change="(newValue:number) => {
          print(`@change: ${newValue}`);
          value = newValue;
        }"
        @enter="print('@enter')"
        @clear="print('@clear')"
      />
    </template>
    <template #controls>
      <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value" />
      <PropControlNumber name="Min" :value="min" @change="(value:number) => min = value" />
      <PropControlNumber name="Max" :value="max" @change="(value:number) => max = value" />
      <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option" />
      <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
    </template>
  </ComponentPage>
</template>
