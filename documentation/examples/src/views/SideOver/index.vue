<script setup lang="ts">
import type { TOverlayType } from "@firstnoodle-ui/bui";
import { BButton, BSideOver, OverlayType } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const buttonRef = ref<typeof BButton>();
const sideOverRef = ref<typeof BSideOver>();
const show = ref(false);

// PropControl state
const closeable = ref(true);
const overlayType = ref<TOverlayType>("default");
const placement = ref<"left" | "right">("right");
const title = ref("The Title");

const placementOptions = ["left", "right"];

const onClose = () => {
  show.value = false;
  buttonRef.value!.focus();
};
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BButton ref="buttonRef" bordered label="Show" @click="show = true" />
      <BSideOver
        v-if="show"
        ref="sideOverRef"
        :title="title"
        :placement="placement"
        :closeable="closeable"
        :overlay-type="overlayType"
        @open="print('@open')"
        @close="
          onClose();
          print('@close')
        "
      >
        <template #main>
          <section class="space-y-4">
            <div class="w-full h-64 bg-tertiary rounded" />
            <div class="w-full h-64 bg-tertiary rounded" />
            <div class="w-full h-64 bg-tertiary rounded" />
            <div class="w-full h-64 bg-tertiary rounded" />
            <div class="w-full h-64 bg-tertiary rounded" />
            <div class="w-full h-64 bg-tertiary rounded" />
          </section>
        </template>
        <template #footer>
          <div class="w-full h-12 flex items-center justify-end">
            <BButton variant="fill" label="Done" @click="sideOverRef!.close()" />
          </div>
        </template>
      </BSideOver>
    </template>
    <template #controls>
      <PropControlBoolean name="Closeable" :value="closeable" @toggle="closeable = !closeable">
        Show close button and allow escape key to close
      </PropControlBoolean>
      <PropControlSelect name="Overlay type" :value="overlayType" :options="[...OverlayType]" @select="(option: TOverlayType) => overlayType = option">
        Background overlay appearance
      </PropControlSelect>
      <PropControlSelect name="Placement" :value="placement" :options="placementOptions" @select="(option: 'left' | 'right') => placement = option">
        Side of screen where SideOver appears
      </PropControlSelect>
      <PropControlString name="Title" :value="title" @change="(value: string) => title = value">
        Header title text
      </PropControlString>
    </template>
  </ComponentPage>
</template>
