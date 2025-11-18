<script setup lang="ts">
import type { TIcon } from "@firstnoodle-ui/bui";
import { BFlexbox, BTag, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const isDeletable = ref(false);
const label = ref("Claude Sonnet");
const selectedIcon = ref<string | undefined>("agent");
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BFlexbox class="gap-2">
        <BTag
          :icon="(selectedIcon as TIcon)"
          :label="label"
          :deletable="isDeletable"
          @delete="print('@delete!')"
        />
      </BFlexbox>
    </template>
    <template #controls>
      <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option" />
      <PropControlBoolean name="Deletable" :value="isDeletable" @toggle="isDeletable = !isDeletable">
        Deletable
      </PropControlBoolean>
      <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
    </template>
  </ComponentPage>
</template>
