<script setup lang="ts">
import type { TIcon } from "@firstnoodle-ui/bui";
import { BFlexbox, BInput, BToggleButton, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  ComponentPageSection,
  EventFlasher,
  EventSection,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const inputRef = ref<typeof BInput>();

const str = ref("");
const placeholder = ref("Write something");
const selectedIcon = ref<string | undefined>();

const matchCase = ref(false);
const matchDiacritics = ref(false);
const matchFullWord = ref(false);

const changeFlasher = ref<typeof EventFlasher>();
const enterFlasher = ref<typeof EventFlasher>();
const clearFlasher = ref<typeof EventFlasher>();
const clearable = ref(false);
</script>

<template>
  <ComponentPage title="Input">
    <ComponentPageSection title="Basic usage">
      <BInput
        ref="inputRef"
        :value="str"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :clearable="clearable"
        @change="(newValue:string) => {
          str = newValue;
          changeFlasher?.flash();
        }"
        @enter="enterFlasher?.flash()"
        @clear="clearFlasher?.flash()"
      >
        <template #inline-controls>
          <BFlexbox class="gap-1">
            <BToggleButton tooltip="Match case" icon="match-case" :active="matchCase" @click="matchCase = !matchCase; inputRef?.focus()" />
            <BToggleButton tooltip="Match full word" icon="match-full-word" :active="matchFullWord" @click="matchFullWord = !matchFullWord; inputRef?.focus()" />
            <BToggleButton tooltip="Match diacritics" icon="match-diacritics" :active="matchDiacritics" @click="matchDiacritics = !matchDiacritics; inputRef?.focus()" />
          </BFlexbox>
        </template>
      </BInput>
      <template #controls>
        <EventSection>
          <EventFlasher ref="changeFlasher" name="change" />
          <EventFlasher ref="enterFlasher" name="enter" />
          <EventFlasher ref="clearFlasher" name="clear" />
        </EventSection>
        <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value" />
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option" />
        <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
