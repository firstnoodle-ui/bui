<script setup lang="ts">
import type { TColumnNavigationOption } from "@firstnoodle-ui/bui";
import { BIcon, BPopper, BPopperContent } from "@firstnoodle-ui/bui";
import { ref } from "vue";
// eslint-disable-next-line import/no-self-import
import CascaderOption from "./CascaderOption.vue";

const { option } = defineProps<{ option: TColumnNavigationOption }>();
const emit = defineEmits(["updateTargets"]);
const popperRef = ref<typeof BPopper | null>(null);
let content: HTMLElement | null = null;

const onOpen = ([_trigger, popper]: [HTMLElement, HTMLElement]) => {
  emit("updateTargets", [popper]);
  content = popper;
};
const onClose = () => {
  emit("updateTargets", []);
  content = null;
};

const onUpdateTargets = (targets: HTMLElement[]) => {
  emit("updateTargets", [content, ...targets]);
  if (popperRef.value === null) return;
  popperRef.value.updateClickOutsideTargets(targets);
};
</script>

<template>
  <BPopper
    v-if="option.type === 'withChildren'"
    ref="popperRef"
    trigger="click"
    placement="right-start"
    root-class="w-full"
    :offset-main="4"
    @open="onOpen"
    @close="onClose"
  >
    <template #default>
      <button class="w-full flex items-center justify-between gap-2 px-3 h-10 bg-light text-action hover:bg-actionLightHover">
        <span>{{ option.label }}</span>
        <BIcon name="chevron-right" class="text-xs text-tertiary" />
      </button>
    </template>
    <template #content>
      <BPopperContent>
        <main class="flex flex-col">
          <CascaderOption v-for="child in option.children" :key="child.id" :option="child" @update-targets="onUpdateTargets" />
        </main>
      </BPopperContent>
    </template>
  </BPopper>
  <button v-else class="w-full flex items-center gap-2 px-3 h-10 bg-light text-action hover:bg-actionLightHover">
    {{ option.label }}
  </button>
</template>
