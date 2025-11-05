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
const widthClass = ref<"max-w-xs" | "max-w-sm" | "max-w-md" | "max-w-lg" | "max-w-xl" | "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" | "max-w-8xl" | "max-w-full">("max-w-lg");

const placementOptions = ["left", "right"];
const widthClassOptions = ["max-w-xs", "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl", "max-w-3xl", "max-w-4xl", "max-w-5xl", "max-w-6xl", "max-w-7xl", "max-w-8xl", "max-w-full"];

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
        :width-class="widthClass"
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
      <PropControlSelect name="Width class" :value="widthClass" :options="widthClassOptions" @select="(option: typeof widthClass) => widthClass = option">
        Maximum width constraint for the SideOver panel
      </PropControlSelect>
    </template>
  </ComponentPage>
</template>
