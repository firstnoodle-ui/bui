<script setup lang="ts">
import { BButton } from "@firstnoodle/bui";
import { ref } from "vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const l1 = ref(false);
const l2 = ref(false);
const l3 = ref(false);
</script>

<template>
  <ComponentPageSection title="Loading">
    <p class="mb-4">
      Click buttons below to set loading
    </p>
    <div class="flex items-center space-x-4">
      <BButton :loading="l1" bordered icon="check" label="Save" type="primary" @click="l1 = !l1" />
      <BButton :loading="l2" solid small icon="trash" type="error" @click="l2 = !l2" />
      <BButton :loading="l3" bordered rounded icon="trash" type="primary" @click="l3 = !l3" />
      <BButton icon="close" label="reset loading" @click="l1 = l2 = l3 = false" />
    </div>
  </ComponentPageSection>
</template>
