<script setup lang="ts">
import { ref } from "vue";
import { BInputNumber, icons, type TIcon } from "@firstnoodle-ui/bui";

import {
  ComponentPage,
  ComponentPageSection,
  PropControlBoolean,
  PropControlNumber,
  PropControlSelect,
  PropControlString,
  EventFlasher,
  EventSection
} from "../../components";

const value = ref(0);
const placeholder = ref('Age');
const selectedIcon = ref<string | undefined>();
const min = ref(0);
const max = ref(10);

const changeFlasher = ref<typeof EventFlasher>();
const enterFlasher = ref<typeof EventFlasher>();
const clearFlasher = ref<typeof EventFlasher>();
const clearable = ref(false);
</script>

<template>
  <ComponentPage title="InputNumber">
    <ComponentPageSection title="Basic usage">
      <BInputNumber
        :value="value"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :clearable="clearable"
        :min="min"
        :max="max"
        class="w-30"
        @change="(newValue:number) => {
          changeFlasher?.flash();
          value = newValue;
          console.log(newValue);
        }" 
        @enter="enterFlasher?.flash()"
        @clear="clearFlasher?.flash()"
      />
        <template #controls>
          <EventSection>
            <EventFlasher ref="changeFlasher" name="change" />
            <EventFlasher ref="enterFlasher" name="enter" />
            <EventFlasher ref="clearFlasher" name="clear" />
          </EventSection>
        <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value"/>
        <PropControlNumber name="Min" :value="min" @change="(value:number) => min = value"/>
        <PropControlNumber name="Max" :value="max" @change="(value:number) => max = value"/>
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option"/>
        <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
        </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
