<script setup lang="ts">
import type { TCheckboxType } from "@firstnoodle-ui/bui";
import { BCheckbox, checkboxTypes } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  ComponentPageSection,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const checked = ref(false);
const indeterminate = ref(false);
const disabled = ref(false);
const label = ref("Label");

const selectedType = ref<string>(checkboxTypes[0]);
</script>

<template>
  <ComponentPage title="Checkbox">
    <template #default="{ print }">
      <BCheckbox
        :type="(selectedType as TCheckboxType)"
        :label="label"
        :checked="checked"
        :indeterminate="indeterminate"
        :disabled="disabled"
        @click="
          checked = !checked;
          print('click')
        "
      />
    </template>
    <template #controls>
      <PropControlBoolean name="Checked" :value="checked" @toggle="checked = !checked" />
      <PropControlBoolean name="Indeterminate" :value="indeterminate" @toggle="indeterminate = !indeterminate">
        Overrides <strong>Checked</strong> prop
      </PropControlBoolean>
      <PropControlBoolean name="Disabled" :value="disabled" @toggle="disabled = !disabled" />
      <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
      <PropControlSelect name="Type" :value="selectedType" :options="[...checkboxTypes]" @select="(option:string) => selectedType = option" />
    </template>
  </ComponentPage>
</template>
