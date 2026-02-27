<script setup lang="ts">
import type { Slots } from "vue";
import type { TOverlayType } from "../types";
import { computed, onMounted, ref, useSlots } from "vue";
import { BButton, BScreenOverlay, BVerticalLayout, BWindowFrame } from "../";
import { useEscapeKey, useTrapFocus } from "../../composables";

const {
  closeable = true,
  interceptClose,
  overlayType = "default",
  placement = "right",
  target = "#modals",
  widthClass = "max-w-lg",
} = defineProps<{
  closeable?: boolean;
  interceptClose?: () => boolean | Promise<boolean>;
  overlayType?: TOverlayType;
  placement?: "left" | "right";
  target?: string;
  title?: string;
  widthClass?:
    | "max-w-xs"
    | "max-w-sm"
    | "max-w-md"
    | "max-w-lg"
    | "max-w-xl"
    | "max-w-2xl"
    | "max-w-3xl"
    | "max-w-4xl"
    | "max-w-5xl"
    | "max-w-6xl"
    | "max-w-7xl"
    | "max-w-8xl"
    | "max-w-full";
}>();

const emit = defineEmits(["close", "open"]);
const slots: Slots = useSlots();
const show = ref(false);
const windowRef = ref<typeof BWindowFrame>();
const trapElementRef = computed(() => windowRef.value?.$el as HTMLElement | undefined);

const { trapFocus, releaseFocus } = useTrapFocus(trapElementRef, true);

// when component is mounted start the transition
onMounted(() => (show.value = true));

const close = () => {
  releaseFocus();
  show.value = false;
};

const onClose = async () => {
  if (!closeable) return;

  if (interceptClose) {
    const shouldClose = await interceptClose();
    if (shouldClose) {
      close();
    }
  }
  else {
    close();
  }
};

closeable && useEscapeKey(onClose);

const onTransitionAfterEnter = () => {
  trapFocus();
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
        <BWindowFrame
          v-show="show"
          ref="windowRef"
          class="flex flex-col overflow-hidden w-full h-full focus:outline-hidden"
          :class="[widthClass, {
            'py-4': !slots.default,
            'ml-auto': placement === 'right',
            'mr-auto': placement === 'left',
          }]"
          style="pointer-events: auto"
        >
          <slot v-if="$slots.default" />
          <BVerticalLayout v-else>
            <template v-if="title || $slots.header" #header>
              <header v-if="title" class="px-6 flex items-center justify-between w-full h-12">
                <h4>{{ title }}</h4>
                <BButton v-if="closeable" small icon="close" variant="textSubtle" @click="onClose" />
              </header>
              <slot v-else name="header" :close="close" />
            </template>
            <template #main>
              <main class="px-6">
                <slot name="main" :close="close" />
              </main>
            </template>
            <template #footer>
              <footer class="px-6">
                <slot name="footer" :close="close" />
              </footer>
            </template>
          </BVerticalLayout>
        </BWindowFrame>
      </transition>
    </BScreenOverlay>
  </Teleport>
</template>
