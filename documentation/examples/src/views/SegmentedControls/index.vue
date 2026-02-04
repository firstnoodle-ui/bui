<script setup lang="ts">
import type { Segment } from "@firstnoodle-ui/bui";
import { BSegmentedControls } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
} from "../../components";

const segments: Segment[] = [
  {
    id: "email",
    icon: "paper-plane",
    label: "Email invites",
  },
  {
    id: "link",
    icon: "link",
    label: "Sharable invite link",
  },
];

const selectedSegment = ref<Segment>(segments[0]);
const onSelect = (segment: Segment) => selectedSegment.value = segment;
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <section class="flex items-center space-x-2">
        <BSegmentedControls
          size="medium"
          :segments="segments"
          :selected-segment="selectedSegment"
          @select="(segment) => {
            print(segment.label!)
            onSelect(segment);
          }"
        />
      </section>
    </template>
    <template #controls>
      <!-- <PropControlBoolean name="Value" :value="value" @toggle="value = !value">
        On/Off
      </PropControlBoolean>
      <PropControlBoolean name="Small" :value="isSmall" @toggle="isSmall = !isSmall">
        Small
      </PropControlBoolean>
      <PropControlBoolean name="Readonly" :value="isReadonly" @toggle="isReadonly = !isReadonly">
        Readonly
      </PropControlBoolean>
      <PropControlSelect name="onColorClass" :value="onColorClass" :options="colorClasses" @select="(option: string) => onColorClass = option">
        onColorClass
      </PropControlSelect>
      <PropControlSelect name="offColorClass" :value="offColorClass" :options="colorClasses" @select="(option: string) => offColorClass = option">
        offColorClass
      </PropControlSelect> -->
    </template>
  </ComponentPage>
</template>
