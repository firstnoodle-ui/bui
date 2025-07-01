<script setup lang="ts">
import type { TOverlayType } from "@firstnoodle-ui/bui";
import { BButton, BModal } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";
import PropControlString from "../../components/PropControlString.vue";

const show = ref(false);
const modalRef = ref<typeof BModal>();
const triggerRef = ref<typeof BButton>();

const closeable = ref(false);
const expandVertically = ref(false);
const overlayTypes = ["default", "blurred"];
const selectedOverlayType = ref(overlayTypes[0]);
const title = ref("Modal title");
const widthClasses: string[] = [
  "max-w-xs",
  "max-w-sm",
  "max-w-md",
  "max-w-lg",
  "max-w-xl",
  "max-w-2xl",
  "max-w-3xl",
  "max-w-4xl",
  "max-w-5xl",
  "max-w-6xl",
  "max-w-7xl",
  "max-w-8xl",
  "max-w-full",
];
const selectedWidthClass = ref(widthClasses[5]);
</script>

<template>
  <ComponentPage title="Modal">
    <template #default="{ print }">
      <BButton ref="triggerRef" bordered icon="popup" label="Open modal" @click="show = true" />
      <BModal
        v-if="show"
        ref="modalRef"
        :closeable="closeable"
        :title="title"
        :overlay-type="(selectedOverlayType as TOverlayType)"
        :expand-vertically="expandVertically"
        :width-class="(selectedWidthClass as any)"
        @ready="print('@ready')"
        @close="
          show = false;
          triggerRef!.focus();
          print('@close');
        "
      >
        <template #main>
          <p class="pb-8">
            You can only close this modal by clicking the button below
          </p>
        </template>
        <template #footer>
          <BButton label="close" variant="fill" @click="modalRef!.close()" />
        </template>
      </BModal>
    </template>
      <template #controls>
        <PropControlBoolean name="Closeable" :value="closeable" @toggle="closeable = !closeable" />
        <PropControlBoolean name="Expand vertically" :value="expandVertically" @toggle="expandVertically = !expandVertically" />
        <PropControlString name="Title" :value="title" @change="(value:string) => title = value" />
        <PropControlSelect name="Overlay type" :value="selectedOverlayType" :options="overlayTypes" @select="(option:string) => selectedOverlayType = option" />
        <PropControlSelect name="Width class" :value="selectedWidthClass" :options="widthClasses" @select="(option:string) => selectedWidthClass = option" />
      </template>
  </ComponentPage>
</template>
