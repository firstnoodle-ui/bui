<script setup lang="ts">
import { BButton, BDialog } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  ComponentPageSection,
} from "../../components";

const show = ref(false);
const buttonRef = ref<typeof BButton>();
const dialogRef = ref<typeof BDialog>();

const onClose = () => {
  show.value = false;
  // return tab focus to element that opened dialog
  buttonRef.value!.focus();
};
</script>

<template>
  <ComponentPage title="Dialog">
    <template #default="{ print }">
      <BButton ref="buttonRef" icon="popup" label="Show dialog" @click="show = true" />
      <BDialog
        v-if="show"
        ref="dialogRef"
        :closeable="true"
        title="This is the dialog title"
        @open="print('open')"
        @close="
          onClose();
          print('close');
        "
      >
        <template #main>
          <p>This dialog can only be closed by clicking the button below</p>
        </template>
        <template #footer>
          <BButton variant="fill" label="Close" @click="dialogRef!.close()" />
        </template>
      </BDialog>
    </template>
    <template #controls>
      closeable?: boolean;
      overlayType?: TOverlayType;
      target?: string;
      title?: string;
      <!-- <PropControlBoolean name="Checked" :value="checked" @toggle="checked = !checked" />
      <PropControlBoolean name="Indeterminate" :value="indeterminate" @toggle="indeterminate = !indeterminate">Overrides <strong>Checked</strong> prop</PropControlBoolean>
      <PropControlBoolean name="Disabled" :value="disabled" @toggle="disabled = !disabled" />
      <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
      <PropControlSelect name="Type" :value="selectedType" :options="[...checkboxTypes]" @select="(option:string) => selectedType = option" /> -->
    </template>
  </ComponentPage>
</template>
