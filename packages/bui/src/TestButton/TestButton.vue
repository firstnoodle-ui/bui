<script setup lang="ts">
export type TestButtonProps = {
  text: string
}

defineProps<TestButtonProps>()
</script>

<template>
  <button class="text-gray-50 rounded-full bg-blue-300 font-bold p-2" @click="console.log(`${text}`)">
    {{ text }}
  </button>
</template>
