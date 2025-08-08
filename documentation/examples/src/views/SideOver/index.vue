<script setup lang="ts">
import { BButton, BSideOver } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const buttonRef = ref<typeof BButton>();
const sideOverRef = ref<typeof BSideOver>();
const show = ref(false);

const onClose = () => {
  show.value = false;
  buttonRef.value!.focus();
};
</script>

<template>
  <ComponentPage title="SideOver">
    <template #default="{ print }">
      <BButton ref="buttonRef" bordered label="Show" @click="show = true" />
      <BSideOver
        v-if="show"
        ref="sideOverRef"
        title="The Title"
        @ready="print('@ready')"
        @close="
          onClose();
          print('@close')
        "
      >
        <template #main>
          <section class="space-y-4">
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
            <div class="w-full h-64 bg-rose-pink-40 rounded" />
          </section>
        </template>
        <template #footer>
          <div class="w-full h-12 flex items-center justify-end">
            <BButton variant="fill" label="Done" @click="sideOverRef!.close()" />
          </div>
        </template>
      </BSideOver>
    </template>
  </ComponentPage>
</template>
