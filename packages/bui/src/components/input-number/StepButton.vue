<script setup lang="ts">
import { ref } from "vue";
import { BIcon } from "../icon";

const { direction, size = "default" } = defineProps<{
  direction: "up" | "down";
  size?: "default" | "small";
}>();
const emit = defineEmits(["click"]);
const active = ref(false);
defineExpose({ setActive: (state: boolean) => active.value = state });
</script>

<template>
  <button
    class="flex items-center justify-center border border-default text-tertiary focus:outline-hidden hover:z-10 hover:bg-secondary hover:border-strong hover:text-secondary focus:bg-secondary focus:border-strong focus:text-secondary focus:outline-none active:bg-tertiary active:text-tertiary"
    :class="{
      'h-4 rounded-tr-lg': direction === 'up' && size === 'default',
      'h-[calc(--spacing(4)+1px)] rounded-br-lg': direction === 'down' && size === 'default',
      'h-3 rounded-tr-lg': direction === 'up' && size === 'small',
      'h-[calc(--spacing(3)+1px)] rounded-br-lg': direction === 'down' && size === 'small',
      'bg-tertiary': active,
    }"
    @click="emit('click')"
  >
    <BIcon :name="direction === 'up' ? 'chevron-up-small' : 'chevron-down-small'" />
  </button>
</template>
