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
const selectedIcon = ref<string | undefined>("admin");
const showSteppers = ref(true);
const min = ref(0);
const max = ref(10);
const size = ref<"default" | "small">("default");
const variant = ref<"border" | "fill">("border");
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BInputNumber
        :value="value"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :show-steppers="showSteppers"
        :min="min"
        :max="max"
        :size="size"
        :variant="variant"
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
      <PropControlSelect name="Size" :value="size" :options="['default', 'small']" @select="(option:'default'|'small') => size = option" />
      <PropControlSelect name="Variant" :value="variant" :options="['border', 'fill']" @select="(option:'border'|'fill') => variant = option" />
      <PropControlBoolean name="Show steppers" :value="showSteppers" @toggle="showSteppers = !showSteppers" />
    </template>
  </ComponentPage>
</template>
