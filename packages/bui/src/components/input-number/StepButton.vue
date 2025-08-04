<script setup lang="ts">
import { ref } from "vue";
import { BIcon } from "../icon";

const { direction } = defineProps<{ direction: "up" | "down" }>();
const emit = defineEmits(["click"]);
const active = ref(false);
defineExpose({ setActive: (state: boolean) => active.value = state });
</script>

<template>
  <button
    class="h-4 flex items-center justify-center border border-default text-tertiary focus:outline-hidden hover:z-10 hover:bg-secondary hover:border-strong hover:text-secondary active:bg-tertiary active:text-tertiary"
    :class="{
      'h-4 rounded-tr-lg': direction === 'up',
      'h-[calc(--spacing(4)+1px)] rounded-br-lg': direction === 'down',
      'bg-tertiary': active,
    }"
    @click="emit('click')"
  >
    <BIcon :name="direction === 'up' ? 'chevron-up-small' : 'chevron-down-small'" />
  </button>
</template>
