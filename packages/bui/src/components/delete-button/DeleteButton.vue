<script setup lang="ts">
import { BIcon } from "../icon";

defineEmits(["click"]);
</script>

<template>
  <button
    class="
        flex items-center justify-center w-4 h-4 rounded-full
        hover:bg-black/15 focus-visible:bg-black/15 active:bg-black/25
        dark:hover:bg-white/15 dark:focus-visible:bg-white/15 dark:active:bg-white/25
        text-tertiary hover:text-secondary active:text-tertiary
        cursor-pointer"
    @click.stop.prevent="$emit('click')"
  >
    <BIcon name="close" />
  </button>
</template>
