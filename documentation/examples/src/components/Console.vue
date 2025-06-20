<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { BButton, BVerticalLayout } from '@firstnoodle/bui'
import LogItem from './LogItem.vue'

const logs = ref<string[]>([])
const clear = () => logs.value = [];
const show = ref(true);

const log = (message: any) => {
  const text = typeof message === 'string' ? message : JSON.stringify(message, null, 2)
  logs.value.unshift(text)
  nextTick(() => {
    const el = document.querySelector('.dev-console-scroll') as HTMLElement
    if (el) el.scrollTop = el.scrollHeight
  })
}

defineExpose({ log });
</script>
  
<template>
  <BVerticalLayout>
    <template #header>
      <section class="w-full h-12 flex items-center justify-between px-4 border-b border-default">
        <div class="text-sm font-bold">Console</div>
        <div class="flex items-center gap-2">
          <BButton icon="trash" variant="outlineSubtle" @click="clear" />
          <BButton :icon="show ? 'chevron-down' : 'chevron-up'" variant="outlineSubtle" @click="show = !show" />
        </div>
      </section>
    </template>
    <template #main v-if="show">
      <div class="h-64 w-full bg-primary text-primary font-mono text-xs p-3 overflow-y-auto">
        <LogItem v-for="(entry, index) in logs" :key="index" :data="entry" />
        <!-- <div v-for="(line, index) in logs" :key="index" class="whitespace-pre-wrap">
          {{ line }}
        </div> -->
      </div>
    </template>
  </BVerticalLayout>
  </template>
 