<script setup lang="ts">
import { BButton, BVerticalLayout } from "@firstnoodle-ui/bui";
import { nextTick, ref } from "vue";
import LogItem from "./LogItem.vue";

defineProps<{
  visible: boolean;
}>();

const emits = defineEmits<{
  (e: "toggle-visibility"): void;
}>();

const logs = ref<string[]>([]);
const clear = () => logs.value = [];

const log = (message: any) => {
  const text = typeof message === "string" ? message : JSON.stringify(message, null, 2);
  logs.value.unshift(text);
  nextTick(() => {
    const el = document.querySelector(".dev-console-scroll") as HTMLElement;
    if (el) el.scrollTop = el.scrollHeight;
  });
};

defineExpose({ log });
</script>

<template>
  <footer class="flex-1 h-full">
    <section class="w-full h-12 flex items-center justify-between px-4 border-y border-default">
      <div class="text-sm font-bold">
        Console
      </div>
      <div class="flex items-center gap-2">
        <BButton icon="trash" variant="outlineSubtle" @click="clear" />
        <BButton :icon="visible ? 'chevron-down' : 'chevron-up'" variant="outlineSubtle" @click="$emit('toggle-visibility')" />
      </div>
    </section>
    <div class="w-full bg-primary text-primary font-mono text-xs p-3">
      <LogItem v-for="(entry, index) in logs" :key="index" :data="entry" />
    </div>
  </footer>
</template>
