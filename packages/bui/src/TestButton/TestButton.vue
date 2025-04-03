<script setup lang="ts">
export type TestButtonProps = {
  text: string
}

defineProps<TestButtonProps>()
</script>

<template>
  <button class="text-gray-700 rounded-full bg-pink-100 p-4" @click="console.log(`${text}`)">
    {{ text }}
  </button>
</template>
