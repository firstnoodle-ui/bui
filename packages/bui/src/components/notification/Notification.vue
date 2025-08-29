<script setup lang="ts">
import { computed } from "vue";
import { BButton, BFlexbox, BIcon } from "../";

const { type = "default" } = defineProps<{
  showDetailsButton?: boolean;
  text: string;
  type?: "default" | "error" | "warning" | "success";
}>();

const emit = defineEmits(["close", "show-details"]);

const icon = computed(() => {
  if (type === "default") return "information";
  if (type === "error") return "error";
  if (type === "warning") return "warning";
  return "check-circled";
});
</script>

<template>
  <div data-theme="dark" class="inline-flex items-stretch h-10 px-1 rounded-xl bg-black shadow-xl pointer-events-auto justify-between">
    <BFlexbox
      class="gap-2 px-3 rounded-l-lg flex-1 overflow-hidden"
      :class="{
        'text-stone-300': type === 'default',
        'text-amber-300': type === 'warning',
        'text-red-300': type === 'error',
        'text-emerald-300': type === 'success',
      }"
    >
      <BIcon :name="icon" />
      <span class="text-sm cursor-default truncate min-w-0">{{ text }}</span>
    </BFlexbox>
    <BFlexbox>
      <BFlexbox class="px-2">
        <BButton
          v-if="showDetailsButton"
          small
          variant="outline"
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
    </BFlexbox>
  </div>
</template>
