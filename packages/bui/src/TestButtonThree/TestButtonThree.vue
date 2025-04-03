<script setup lang="ts">
import type { TestButtonThreeProps } from "./test-button-three-types"

defineProps<TestButtonThreeProps>()
</script>

<template>
  <button class="text-gray-700 rounded-full bg-blue-200 p-4" @click="console.log(`${text}`)">
    {{ text }}
  </button>
</template>
