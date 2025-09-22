<script setup lang="ts">
import type { TOverlayType } from "@firstnoodle-ui/bui";
import { BButton, BDialog, OverlayType } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const show = ref(false);
const buttonRef = ref<typeof BButton>();
const dialogRef = ref<typeof BDialog>();

// PropControl state
const closeable = ref(true);
const overlayType = ref<TOverlayType>("default");
const title = ref("This is the dialog title");

const onClose = () => {
  show.value = false;
  // return tab focus to element that opened dialog
  buttonRef.value!.focus();
};
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BButton ref="buttonRef" icon="popup" label="Show dialog" @click="show = true" />
      <BDialog
        v-if="show"
        ref="dialogRef"
        :closeable="closeable"
        :overlay-type="overlayType"
        :title="title"
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
      <PropControlBoolean name="Closeable" :value="closeable" @toggle="closeable = !closeable">
        Show close button and allow escape key to close
      </PropControlBoolean>
      <PropControlSelect name="Overlay type" :value="overlayType" :options="[...OverlayType]" @select="(option: TOverlayType) => overlayType = option">
        Background overlay appearance
      </PropControlSelect>
      <PropControlString name="Title" :value="title" @change="(value: string) => title = value">
        Dialog header title text
      </PropControlString>
    </template>
  </ComponentPage>
</template>
