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

const showInlineControls = ref(false);
const str = ref("");
const placeholder = ref("Write something");
const selectedIcon = ref<string | undefined>("admin");
const size = ref<"default" | "small">("small");
const variant = ref<"border" | "fill">("border");
const multiline = ref(false);

const matchCase = ref(false);
const matchDiacritics = ref(false);
const matchFullWord = ref(false);

const clearable = ref(false);
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <div class="w-full flex gap-2">
        <BInput
          ref="inputRef"
          :value="str"
          :icon="(selectedIcon as TIcon)"
          :placeholder="placeholder"
          :clearable="clearable"
          :size="size"
          :variant="variant"
          :multiline="multiline"
          @change="(newValue:string) => {
            str = newValue;
            print(`change: ${newValue}`);
          }"
          @enter="print('enter key')"
          @clear="str = ''; print('clear')"
        >
          <template v-if="showInlineControls" #inline-controls>
            <BFlexbox class="gap-1">
              <BToggleButton tooltip="Match case" icon="match-case" :active="matchCase" @click="matchCase = !matchCase; inputRef?.focus()" />
              <BToggleButton tooltip="Match full word" icon="match-full-word" :active="matchFullWord" @click="matchFullWord = !matchFullWord; inputRef?.focus()" />
              <BToggleButton tooltip="Match diacritics" icon="match-diacritics" :active="matchDiacritics" @click="matchDiacritics = !matchDiacritics; inputRef?.focus()" />
            </BFlexbox>
          </template>
        </BInput>
      </div>
    </template>
    <template #controls>
      <PropControlBoolean name="Show inline controls" :value="showInlineControls" @toggle="showInlineControls = !showInlineControls" />
      <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value" />
      <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option" />
      <PropControlSelect name="Size" :value="size" :options="['default', 'small']" @select="(option:'default'|'small') => size = option" />
      <PropControlSelect name="Variant" :value="variant" :options="['border', 'fill']" @select="(option:'border'|'fill') => variant = option" />
      <PropControlBoolean name="Multiline" :value="multiline" @toggle="multiline = !multiline" />
      <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
    </template>
  </ComponentPage>
</template>
