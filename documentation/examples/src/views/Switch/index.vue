<script setup lang="ts">
import { BSwitch } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const value = ref(false);

const onToggle = () => {
  value.value = !value.value;
};
</script>

<template>
  <ComponentPage title="Switch">
    <ComponentPageSection title="Basic usage">
      <section class="flex items-center space-x-2">
        <span>blue</span>
        <!-- <b-switch small :value="value" on-color-class="bg-lava-red" off-color-class="bg-light-blue" @toggle="onToggle" /> -->
        <BSwitch small :value="value" on-color-class="bg-red-500" off-color-class="bg-blue-500" @toggle="onToggle" />
        <span>red</span>
      </section>
    </ComponentPageSection>
  </ComponentPage>
</template>
