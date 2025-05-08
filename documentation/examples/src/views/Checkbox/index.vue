<script setup lang="ts">
import { BCheckbox, type TPopSelectOption } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlString from "../../components/PropControlString.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";

const checked = ref(false);
const indeterminate = ref(false);
const disabled = ref(false);
const label = ref('Label');

const typeOptions:TPopSelectOption[] = ['default', 'circle'].map(i => ({ label: i }));
const selectedType = ref<TPopSelectOption>(typeOptions[0]);
</script>

<template>
  <ComponentPage title="Checkbox">
    <ComponentPageSection title="Basic usage">
      <section class="flex items-center gap-8">
        <BCheckbox
          :type="selectedType.label"
          :label="label"
          :checked="checked"
          :indeterminate="indeterminate"
          :disabled="disabled"
          @click="checked = !checked"
        />
      </section>
      <template #controls>
        <PropControlBoolean name="Checked" :value="checked" @toggle="checked = !checked" />
        <PropControlBoolean name="Indeterminate" :value="indeterminate" @toggle="indeterminate = !indeterminate">Overrides <strong>Checked</strong> prop</PropControlBoolean>
        <PropControlBoolean name="Disabled" :value="disabled" @toggle="disabled = !disabled" />
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <PropControlSelect name="Type" :value="selectedType" :options="typeOptions" @select="(option:TPopSelectOption) => selectedType = option" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
