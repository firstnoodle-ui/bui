<script setup lang="ts">
import type { TestButtonFourProps } from "./test-button-four-types"

export type ButtonFourProps = TestButtonFourProps

defineProps<ButtonFourProps>()
</script>

<template>
  <button class="text-gray-50 rounded-full bg-amber-800 p-4" @click="console.log(`${text}`)">
    {{ text }}
  </button>
</template>
