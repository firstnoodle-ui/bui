<script setup lang="ts">
import { BHorizontalLayout, BVerticalLayout } from "@firstnoodle/bui";
import { ref } from "vue";
import Console from "./Console.vue";

defineProps({ title: String });
const consoleRef = ref<typeof Console>();
const print = (msg: string) => consoleRef.value?.log(msg);
</script>

<template>
  <BHorizontalLayout
    aside-right-visible
    aside-right-draggable
    :aside-right-width="640"
  >
    <template #main>
      <BVerticalLayout footer-height-class="">
        <template #header>
          <header class="w-full h-12 flex items-center px-4 border-b border-default ">
            <h5 class="text-primary">
              {{ title }}
            </h5>
          </header>
        </template>
        <template #main>
          <article class="relative w-full bg-primary p-8">
            <main class="w-full flex flex-col">
              <slot :print="print" />
            </main>
          </article>
        </template>
        <template #footer>
          <section class="w-full h-full border-t border-default">
            <Console ref="consoleRef" />
          </section>
        </template>
      </BVerticalLayout>
    </template>
    <template #aside-right>
      <aside class="w-full h-full border-l border-default p-8">
        <slot name="controls" />
      </aside>
    </template>
  </BHorizontalLayout>
</template>
