<script setup lang="ts">
import { computed } from "vue";
import type { TIcon } from "../types";
import { BButton, BFlexbox, BIcon } from "../";

const { type = "default" } = defineProps<{
  icon?: TIcon;
  showDetailsButton?: boolean;
  text: string;
  type: "default"|"error"|"warning"|"success";
}>();

const emit = defineEmits(["close", "show-details"]);

const icon = computed(() => {
  if(type === "default") return "information";
  if(type === "error") return "error";
  if(type === "warning") return "warning";
  return "check-circled";
})
</script>

<template>
  <div data-theme="dark" class="inline-flex items-stretch h-10 px-1 rounded-xl bg-black shadow-xl pointer-events-auto">
    <BFlexbox
      class="gap-2 px-3 rounded-l-lg"
      :class="{
        'text-stone-300': type === 'default',
        'text-amber-300': type === 'warning',
        'text-red-300': type === 'error',
        'text-emerald-300': type === 'success',
      }"
    >
      <BIcon :name="icon" />
      <span class="text-sm cursor-default">{{ text }}</span>
    </BFlexbox>
    <BFlexbox class="px-2">
      <BButton
        v-if="showDetailsButton"
        small
        variant="text"
        label="Details"
        @click="emit('show-details')"
      />
    </BFlexbox>
    <BFlexbox class="px-1">
      <BButton
        small
        variant="textSubtle"
        icon="close"
        @click="emit('close')"
      />
    </BFlexbox>
  </div>
</template>
