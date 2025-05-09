<!-- eslint-disable no-console -->
<script setup lang="ts">
import { BConfirmCancel } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const onCancel = () => console.log("cancel");
const onConfirm = () => console.log("confirm");
</script>

<template>
  <ComponentPage title="ConfirmCancel">
    <ComponentPageSection title="ConfirmCancel">
      <div class="w-1/3">
        <BConfirmCancel
          small
          cancel-button-is-text
          confirm-icon="check"
          confirm-label="Save"
          :save-disabled="false"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
      <template #controls>
        alignment?: "left" | "right";
        cancelButtonIsText?: boolean;
        cancelDisabled?: boolean;
        cancelIcon?: TIcon;
        cancelLabel?: string;
        cancelVariant?: ButtonVariant;
        confirmDisabled?: boolean;
        confirmIcon?: TIcon;
        confirmLabel?: string;
        confirmVariant?: ButtonVariant;
        fillContainer?: boolean;
        loading?: boolean;
        small?: boolean;
        <!-- <PropControlBoolean name="Checked" :value="checked" @toggle="checked = !checked" />
        <PropControlBoolean name="Indeterminate" :value="indeterminate" @toggle="indeterminate = !indeterminate">Overrides <strong>Checked</strong> prop</PropControlBoolean>
        <PropControlBoolean name="Disabled" :value="disabled" @toggle="disabled = !disabled" />
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <PropControlSelect name="Type" :value="selectedType" :options="[...checkboxTypes]" @select="(option:string) => selectedType = option" /> -->
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>