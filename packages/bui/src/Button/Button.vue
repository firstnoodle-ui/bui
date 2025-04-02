<script setup lang="ts">
export interface ButtonProps {
  text: string
}
defineProps<ButtonProps>()
</script>

<template>
  <button>
    {{ text }}
  </button>
</template>
