<script setup lang="ts">
import type { Slots } from "vue";
import type { TOverlayType } from "../types";
import { onMounted, ref, useSlots } from "vue";
import { BButton, BScreenOverlay, BVerticalLayout } from "../";
import { useEscapeKey, useTrapFocus } from "../../";
import WindowFrame from "../window-frame/WindowFrame.vue";

const {
  closeable = true,
  overlayType = "default",
  placement = "right",
  target = "#modals",
} = defineProps<{
  closeable?: boolean;
  overlayType?: TOverlayType;
  placement?: "left" | "right";
  target?: string;
  title?: string;
}>();

const emit = defineEmits(["close", "open"]);
const slots: Slots = useSlots();
const show = ref(false);
const panelRef = ref<HTMLDivElement>();
const { trapFocus } = useTrapFocus(panelRef);

// when component is mounted start the transition
onMounted(() => (show.value = true));

const close = () => (show.value = false);
const onClose = () => closeable && close();
closeable && useEscapeKey(onClose);

// afterTransition -> start trapFocus
const onTransitionAfterEnter = () => {
  // focus the dialog after transition
  // panelRef.value?.focus();

  // trap focus inside the dialog (without focusing the first focusable element)
  // trapFocus();
  emit("open");
};

defineExpose({ close });
</script>

<template>
  <Teleport :to="target">
    <BScreenOverlay :show="show" :type="overlayType" class="p-4" @click="onClose" @close="emit('close')">
      <transition
        enter-active-class="transform transition ease-in-out duration-500"
        :enter-from-class="placement === 'right' ? 'translate-x-full' : '-translate-x-full'"
        enter-to-class=""
        leave-active-class="transform transition ease-in-out duration-300"
        leave-class="translate-x-0"
        :leave-to-class="placement === 'right' ? 'translate-x-full' : '-translate-x-full'"
        @after-enter="onTransitionAfterEnter"
      >
        <WindowFrame
          v-show="show"
          ref="panelRef"
          class="flex flex-col overflow-hidden max-w-lg w-full h-full focus:outline-hidden"
          :class="{
            'py-4': !slots.default,
            'ml-auto': placement === 'right',
            'mr-auto': placement === 'left',
          }"
          style="pointer-events: auto"
        >
          <slot v-if="$slots.default" />
          <BVerticalLayout v-else>
            <template v-if="title || $slots.header" #header>
              <header v-if="title" class="px-6 flex items-center justify-between w-full h-12">
                <h4>{{ title }}</h4>
                <BButton v-if="closeable" small icon="close" variant="textSubtle" @click="onClose" />
              </header>
              <slot v-else name="header" />
            </template>
            <template #main>
              <main class="px-6">
                <slot name="main" />
              </main>
            </template>
            <template #footer>
              <footer class="px-6">
                <slot name="footer" />
              </footer>
            </template>
          </BVerticalLayout>
        </WindowFrame>
      </transition>
    </BScreenOverlay>
  </Teleport>
</template>
