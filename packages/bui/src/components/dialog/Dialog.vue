<script setup lang="ts">
import type { TOverlayType } from "../types";
import { onMounted, ref } from "vue";
import { BButton, BFadeInUp, BScreenOverlay, BVerticalLayout, BWindowFrame } from "../";
import { useEscapeKey } from "../../composables";

const props = withDefaults(
  defineProps<{
    closeable?: boolean;
    overlayType?: TOverlayType;
    target?: string;
    title?: string;
  }>(),
  {
    closeable: true,
    overlayType: "default",
    target: "#modals",
  },
);

const emit = defineEmits(["close"]);

const show = ref(false);
const windowRef = ref<typeof BWindowFrame>();

// when component is mounted start the transition
onMounted(() => (show.value = true));

const close = () => (show.value = false);
const onClose = () => props.closeable && close();
props.closeable && useEscapeKey(onClose);

const onTransitionAfterEnter = () => {

};

defineExpose({ close });
</script>

<template>
  <Teleport :to="props.target">
    <BScreenOverlay :show="show" :type="overlayType" class="p-2 md:pt-32" @click="onClose" @close="emit('close')">
      <BFadeInUp @transition-after-enter="onTransitionAfterEnter">
        <BWindowFrame v-show="show" ref="windowRef" class="h-64 max-w-2xl md:w-1/2 md:max-w-lg p-4 md:px-8">
          <BVerticalLayout>
            <template #header>
              <header class="flex items-center justify-between w-full h-12">
                <h4 v-if="props.title">
                  {{ props.title }}
                </h4>
                <h4 v-else>
                  <slot name="title" />
                </h4>
                <BButton v-if="props.closeable" small icon="close" variant="textSubtle" @click="onClose" />
              </header>
            </template>
            <template #main>
              <slot name="main" />
            </template>
            <template #footer>
              <footer class="flex items-center h-12">
                <slot name="footer" />
              </footer>
            </template>
          </BVerticalLayout>
        </BWindowFrame>
      </BFadeInUp>
    </BScreenOverlay>
  </Teleport>
</template>
