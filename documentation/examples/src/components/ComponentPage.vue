<script setup lang="ts">
import { BHorizontalLayout, BPanelLayout, BScrollbar, BVerticalLayout } from "@firstnoodle-ui/bui";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Console from "./Console.vue";

const consoleRef = ref<typeof Console>();
const print = (msg: string) => consoleRef.value?.log(msg);
const endPanelVisible = ref(true);
const endPanelHeight = computed(() => endPanelVisible.value ? 200 : 48);

const route = useRoute();
</script>

<template>
  <BHorizontalLayout
    aside-right-visible
    aside-right-draggable
    :aside-right-width="700"
  >
    <template #main>
      <BScrollbar disable-x>
        <article class="relative h-full w-full bg-primary p-8">
          <main class="w-full h-full">
            <slot :print="print" />
          </main>
        </article>
      </BScrollbar>
    </template>
    <template #aside-right>
      <aside class="w-full h-full border-l border-default">
      <BPanelLayout
        orientation="vertical"
        start-panel-visible
        end-panel-visible
        end-panel-draggable
        :end-panel-size="endPanelHeight"
      >
        <template #start-panel>
          <header class="w-full h-12 flex items-center gap-1 px-4 border-b border-default ">
            <span class="text-lg">❖</span>
            <h5 class="text-primary">
              {{ route.name || "No title" }}
            </h5>
          </header>
        </template>
        <template #main>
          <BScrollbar disable-x>
            <div class="p-8">
              <slot name="controls" />
            </div>
          </BScrollbar>
        </template>
        <template #end-panel>
          <Console ref="consoleRef" :visible="endPanelVisible" @toggle-visibility="endPanelVisible = !endPanelVisible" />
        </template>
      </BPanelLayout>
      </aside>
    </template>
  </BHorizontalLayout>
</template>
