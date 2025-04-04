<script setup lang="ts">
import { BCheckbox, BPopper } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const showPopper = ref(0);

const onToggle = () => {
  showPopper.value = showPopper.value ? 0 : 1;
};
</script>

<template>
  <ComponentPageSection title="Triggers">
    <main class="flex items-center">
      <section class="w-1/3">
        <BPopper trigger="hover" placement="bottom-start">
          <div class="cursor-default">
            Hover (default)
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
      <section class="w-1/3">
        <BPopper trigger="click" placement="bottom-start" disable-click-outside>
          <div class="cursor-pointer">
            Click to toggle
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
      <section class="w-1/3 flex items-center space-x-2">
        <BCheckbox :value="showPopper" @click="onToggle" />
        <BPopper trigger="manual" :show="Boolean(showPopper)" placement="bottom-start">
          <div class="cursor-default">
            Manual
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
    </main>
  </ComponentPageSection>
</template>
