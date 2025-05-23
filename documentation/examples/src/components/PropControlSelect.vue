<script setup lang="ts">
import type { TPopSelectOption } from "@firstnoodle/bui";
import { BButton, BPopSelect } from "@firstnoodle/bui";
import { computed } from "vue";
import PropControlBase from "./PropControlBase.vue";

const { clearable = false, options, value } = defineProps<{ value?: string; options: string[]; name: string; clearable?: boolean }>();

const emit = defineEmits(["select"]);
const localOptions = computed(() => options.map(o => ({ label: o })));
const selected = computed(() => localOptions.value.find(o => o.label === value));

const onSelect = (option: TPopSelectOption) => emit("select", option.label);
const onClear = () => emit("select", undefined);
</script>

<template>
  <PropControlBase type="<T>" :name="name">
    <template #control>
      <BPopSelect
        :options="localOptions"
        :selected="selected"
        filterable
        @select="onSelect"
      >
        <template #trigger="{ visible }">
          <BButton
            :label="value || 'Select'"
            :soft-focus="visible"
            variant="outlineSubtle"
            icon-after="chevron-down"
          />
        </template>
      </BPopSelect>
      <BButton
        v-if="clearable && value"
        variant="text"
        icon="trash"
        @click="onClear"
      />
    </template>
    <template #notes>
      <slot />
    </template>
  </PropControlBase>
</template>
