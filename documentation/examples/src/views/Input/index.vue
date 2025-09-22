<script setup lang="ts">
import type { TIcon } from "@firstnoodle-ui/bui";
import { BFlexbox, BInput, BToggleButton, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
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

const clearable = ref(false);
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BInput
        ref="inputRef"
        :value="str"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :clearable="clearable"
        @change="(newValue:string) => {
          str = newValue;
          print(`change: ${newValue}`);
        }"
        @enter="print('enter key')"
        @clear="print('clear')"
      >
        <template #inline-controls>
          <BFlexbox class="gap-1">
            <BToggleButton tooltip="Match case" icon="match-case" :active="matchCase" @click="matchCase = !matchCase; inputRef?.focus()" />
            <BToggleButton tooltip="Match full word" icon="match-full-word" :active="matchFullWord" @click="matchFullWord = !matchFullWord; inputRef?.focus()" />
            <BToggleButton tooltip="Match diacritics" icon="match-diacritics" :active="matchDiacritics" @click="matchDiacritics = !matchDiacritics; inputRef?.focus()" />
          </BFlexbox>
        </template>
      </BInput>
    </template>
    <template #controls>
      <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value" />
      <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option" />
      <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
    </template>
  </ComponentPage>
</template>
