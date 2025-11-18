<script setup lang="ts">
import { BSwitch } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
} from "../../components";

const value = ref(false);
const isSmall = ref(false);
const isReadonly = ref(false);
const colorClasses = ["bg-secondary", "bg-tertiary", "bg-action", "bg-red-500", "bg-purple-400"];
const offColorClass = ref("bg-tertiary");
const onColorClass = ref("bg-action");

const onToggle = () => value.value = !value.value;
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <section class="flex items-center space-x-2">
        <span>blue</span>
        <BSwitch
          :small="isSmall"
          :readonly="isReadonly"
          :value="value"
          :off-color-class="offColorClass"
          :on-color-class="onColorClass"
          @toggle="
            onToggle();
            print(`@toggle: ${value ? 'on' : 'off'}`)
          "
        />
        <span>red</span>
      </section>
    </template>
    <template #controls>
      <PropControlBoolean name="Value" :value="value" @toggle="value = !value">
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
      </PropControlSelect>
    </template>
  </ComponentPage>
</template>
