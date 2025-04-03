<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <button class="text-gray-50 rounded-full bg-gray-600 p-4" @click="console.log(`${text}`)">
    {{ text }}
  </button>
</template>
