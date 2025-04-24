<script setup lang="ts">
import { BIcon, icons } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPage title="Icon">
    <ComponentPageSection title="Basic usage">
      <BIcon name="box" />
    </ComponentPageSection>
    <ComponentPageSection title="All icons">
      <section class="w-full flex flex-wrap items-center justify-center">
        <div
          v-for="icon in icons"
          :key="icon"
          class="w-32 h-32 flex flex-col items-center justify-center space-y-4 bg-white text-primary rounded-lg opacity-75 hover:opacity-100 cursor-pointer hover:shadow-lg hover:bg-sand-grey-40"
        >
          <BIcon :name="icon" />
          <div class="w-full text-center text-xs truncate">
            {{ icon }}
          </div>
        </div>
      </section>
    </ComponentPageSection>
  </ComponentPage>
</template>
