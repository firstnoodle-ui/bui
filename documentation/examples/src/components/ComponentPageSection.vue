<script setup lang="ts">
import { BCollapse } from "@firstnoodle/bui";
import { ref } from "vue";

defineProps({ title: String });
const showControls = ref(true);
</script>

<template>
  <section class="w-full border border-default space-y-2">
    <header class="p-4 border-b border-default bg-secondary text-primary">
      <h5>{{ title }}</h5>
    </header>
    <main class="p-4 text-primary">
      <slot />
    </main>
    <section v-if="$slots.controls" class="w-full px-2 bg-secondary border-t border-default">
      <BCollapse
        border-class-open="border-transparent"
        border-class-closed="border-transparent"
        header-bg-class="bg-secondary"
        :open="showControls"
        @toggle="showControls = !showControls"
      >
        <template #header>
          <h5>Controls</h5>
        </template>
        <template #content>
          <section class="p-2">
            <slot name="controls" />
          </section>
        </template>
      </BCollapse>
    </section>
  </section>
</template>
