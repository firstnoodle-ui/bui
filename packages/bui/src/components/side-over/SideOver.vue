<script setup lang="ts">
import type { Slots } from "vue";
import type { TOverlayType } from "../types";
import { onMounted, ref, useSlots } from "vue";
import { BButton, BScreenOverlay, BVerticalLayout } from "../";
import { useEscapeKey, useTrapFocus } from "../../";

const props = withDefaults(
  defineProps<{
    closeable?: boolean;
    overlayType?: TOverlayType;
    noScrollbar?: boolean;
    placement?: "left"|"right";
    target?: string;
    title?: string;
  }>(),
  {
    closeable: true,
    overlayType: "default",
    noScrollbar: false,
    placement: "right",
    target: "#modals",
  },
);
const emit = defineEmits(["close"]);
const slots: Slots = useSlots();
const show = ref(false);
const panelRef = ref<HTMLDivElement>();
const { trapFocus } = useTrapFocus(panelRef);

// when component is mounted start the transition
onMounted(() => (show.value = true));

const close = () => (show.value = false);
const onClose = () => props.closeable && close();
props.closeable && useEscapeKey(onClose);

// afterTransition -> start trapFocus
const onTransitionAfterEnter = () => {
  // focus the dialog after transition
  panelRef.value?.focus();
  // trap focus inside the dialog (without focusing the first focusable element)
  trapFocus();
};

defineExpose({ close });
</script>

<template>
  <Teleport to="#modals">
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
        <div
          v-show="show"
          ref="panelRef"
          tabindex="0"
          class="flex flex-col bg-primary shadow-xl rounded-xl overflow-hidden max-w-lg w-full h-full focus:outline-hidden"
          :class="{
            'px-6 py-4': !slots.default,
            'ml-auto': placement === 'right',
            'mr-auto': placement === 'left',
          }"
          style="pointer-events: auto"
        >
          <slot v-if="$slots.default" />
          <BVerticalLayout v-else>
            <template v-if="props.title || $slots.header" #header>
              <header v-if="props.title" class="flex items-center justify-between w-full h-12">
                <h4>{{ props.title }}</h4>
                <BButton v-if="props.closeable" small icon="close" variant="textSubtle" @click="onClose" />
              </header>
              <slot v-else name="header" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #footer>
              <slot name="footer" />
            </template>
          </BVerticalLayout>
        </div>
      </transition>
    </BScreenOverlay>
  </Teleport>
</template>
