<script setup lang="ts">
import { BSwitch } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const value = ref(false);

const onToggle = () => value.value = !value.value;
</script>

<template>
  <ComponentPage title="Switch">
    <template #default="{ print }">
      <section class="flex items-center space-x-2">
        <span>blue</span>
        <BSwitch
          small
          :value="value"
          @toggle="
            onToggle();
            print(`@toggle: ${value ? 'on' : 'off'}`)
          "
        />
        <span>red</span>
      </section>
    </template>
  </ComponentPage>
</template>
