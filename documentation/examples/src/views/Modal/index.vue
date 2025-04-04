<script setup lang="ts">
import { BButton, BModal } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const showDefault = ref(false);
const defaultModalRef = ref<typeof BModal>();
const defaultTriggerRef = ref<typeof BButton>();

const showBare = ref(false);
const bareModalRef = ref<typeof BModal>();
const bareTriggerRef = ref<typeof BButton>();

const showBlurred = ref(false);
const blurredTriggerRef = ref<typeof BButton>();

const showWidth = ref(false);
const widthTriggerRef = ref<typeof BButton>();
</script>

<template>
  <ComponentPage title="Modal">
    <ComponentPageSection title="Basic usage (+ not closeable)">
      <BButton ref="defaultTriggerRef" bordered icon="popup" label="Open modal" @click="showDefault = true" />
      <BModal
        v-if="showDefault"
        ref="defaultModalRef"
        :closeable="false"
        title="Some kind of titly"
        @close="
          showDefault = false;
          defaultTriggerRef!.focus();
        "
      >
        <template #main>
          <p class="pb-8">
            You can only close this modal by clicking the button below
          </p>
        </template>
        <template #footer>
          <BButton label="close" solid type="primary" @click="defaultModalRef!.close()" />
        </template>
      </BModal>
    </ComponentPageSection>
    <ComponentPageSection title="Blurred overlay">
      <BButton ref="blurredTriggerRef" bordered icon="popup" label="Open modal" @click="showBlurred = true" />
      <BModal
        v-if="showBlurred"
        expand-vertically
        overlay-type="blurred"
        title="Blurred overlay + expand-vertically"
        @close="
          showBlurred = false;
          blurredTriggerRef!.focus();
        "
      >
        <template #header>
          <header class="h-8 flex items-center bg-sand-grey-15">
            Hello from the #header slot (using header together with title)
          </header>
        </template>
        <template #main>
          <p class="py-4">
            Close this modal by hitting the escape key, clicking on the close button, or clicking on the overlay behind the modal
          </p>
        </template>
      </BModal>
    </ComponentPageSection>
    <ComponentPageSection title="Bare">
      <BButton ref="bareTriggerRef" bordered icon="popup" label="Open modal" @click="showBare = true" />
      <BModal
        v-if="showBare"
        ref="bareModalRef"
        width-class="max-w-xl"
        @close="
          showBare = false;
          bareTriggerRef!.focus();
        "
      >
        <p>If you want to have complete control of the layout, use the default slot (and none of the other!)</p>
        <BButton label="close" solid type="primary" @click="bareModalRef!.close()" />
      </BModal>
    </ComponentPageSection>
    <ComponentPageSection title="Width">
      <BButton ref="widthTriggerRef" bordered icon="popup" label="Open modal" @click="showWidth = true" />
      <BModal
        v-if="showWidth"
        expand-vertically
        width-class="max-w-8xl"
        title="Width is 8xl"
        @close="
          showWidth = false;
          widthTriggerRef!.focus();
        "
      >
        <template #main>
          <p>Close this modal by hitting the escape key, clicking on the close button, or clicking on the overlay behind the modal</p>
        </template>
      </BModal>
    </ComponentPageSection>
  </ComponentPage>
</template>
