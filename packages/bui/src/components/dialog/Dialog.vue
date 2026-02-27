<script setup lang="ts">
import type { TOverlayType } from "../types";
import { computed, onMounted, ref } from "vue";
import { BButton, BFadeInUp, BScreenOverlay, BVerticalLayout, BWindowFrame } from "../";
import { useEscapeKey, useTrapFocus } from "../../composables";

const {
  closeable = true,
  overlayType = "default",
  target = "#modals",
} = defineProps<{
  closeable?: boolean;
  overlayType?: TOverlayType;
  target?: string;
  title?: string;
}>();

const emit = defineEmits(["close", "open"]);

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
const onClose = () => closeable && close();
closeable && useEscapeKey(onClose);

defineExpose({ close });
</script>

<template>
  <Teleport :to="target">
    <BScreenOverlay :show="show" :type="overlayType" @click="onClose" @close="emit('close')">
      <BFadeInUp @transition-after-enter="() => { trapFocus(); emit('open'); }">
        <BWindowFrame v-show="show" ref="windowRef" class="h-64 max-w-2xl md:w-1/2 md:max-w-lg p-4 md:px-8">
          <BVerticalLayout>
            <template #header>
              <header class="flex items-center justify-between w-full h-12">
                <h4 v-if="title">
                  {{ title }}
                </h4>
                <h4 v-else>
                  <slot name="title" :close="close" />
                </h4>
                <BButton v-if="closeable" small icon="close" variant="textSubtle" @click="onClose" />
              </header>
            </template>
            <template #main>
              <slot name="main" :close="close" />
            </template>
            <template #footer>
              <footer class="flex items-center h-12">
                <slot name="footer" :close="close" />
              </footer>
            </template>
          </BVerticalLayout>
        </BWindowFrame>
      </BFadeInUp>
    </BScreenOverlay>
  </Teleport>
</template>
