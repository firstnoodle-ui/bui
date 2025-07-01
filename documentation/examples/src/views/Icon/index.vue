<script setup lang="ts">
import { BIcon, icons } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
</script>

<template>
  <ComponentPage title="Icon">
    <section class="w-full flex flex-wrap items-center justify-center">
      <div
        v-for="icon in icons"
        :key="icon"
        class="text-primary w-32 h-32 flex flex-col items-center justify-center gap-4 bg-primary text-primary rounded-lg hover:shadow-lg hover:bg-tertiary"
      >
        <BIcon :name="icon" />
        <div class="w-full text-center text-xs truncate">
          {{ icon }}
        </div>
      </div>
    </section>
  </ComponentPage>
</template>
