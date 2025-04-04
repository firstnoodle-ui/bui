<script setup lang="ts">
import type { TOverlayType } from "../types";
import { onMounted, ref, useSlots } from "vue";
import { BButton, BFadeInUp, BScreenOverlay, BVerticalLayout, BWindowFrame } from "../";
import { useEscapeKey } from "../../composables";

const props = withDefaults(
  defineProps<{
    closeable?: boolean;
    expandVertically?: boolean;
    overlayType?: TOverlayType;
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
  }>(),
  {
    closeable: true,
    expandVertically: false,
    overlayType: "default",
    target: "#modals",
    widthClass: "max-w-2xl",
  },
);

const emit = defineEmits(["close", "ready"]);

const slots = useSlots();
const windowRef = ref<typeof BWindowFrame>();
const show = ref(false);

onMounted(() => {
  if (slots.default && (props.title || slots.header || slots.main || slots.footer)) {
    console.warn(
      "You are using named slots (or props.title) and default slot at the same time. This is not supported. Please use either named slots (and props.title) or the default slot.",
    );
  }
  // when component is mounted start the transition
  show.value = true;
});

const close = () => (show.value = false);
const onClose = () => props.closeable && close();
props.closeable && useEscapeKey(onClose);

const onTransitionAfterEnter = () => {
  // windowRef.value!.trapFocus();
  emit("ready");
};

defineExpose({ close });
</script>

<template>
  <Teleport :to="target">
    <BScreenOverlay
      :show="show"
      :type="overlayType"
      :class="props.expandVertically ? 'p-2 md:p-12' : 'p-2 md:pt-32'"
      @click="onClose"
      @close="emit('close')"
    >
      <BFadeInUp @transition-after-enter="onTransitionAfterEnter">
        <BWindowFrame
          v-show="show"
          ref="windowRef"
          class="h-full"
          :class="[
            props.widthClass,
            {
              'px-8 py-6': !slots.default,
              'md:h-auto': !props.expandVertically,
            },
          ]"
        >
          <slot v-if="$slots.default" />
          <BVerticalLayout v-else>
            <template v-if="props.title || $slots.header" #header>
              <header v-if="props.title" class="flex items-center justify-between h-12 w-full mb-4">
                <h4>{{ props.title }}</h4>
                <BButton v-if="closeable" icon="close" @click="onClose" />
              </header>
              <slot name="header" />
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template v-if="$slots.footer" #footer>
              <footer class="flex items-center h-full">
                <slot name="footer" />
              </footer>
            </template>
          </BVerticalLayout>
        </BWindowFrame>
      </BFadeInUp>
    </BScreenOverlay>
  </Teleport>
</template>
