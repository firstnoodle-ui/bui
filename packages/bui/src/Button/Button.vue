<script setup lang="ts">
export type ButtonProps = {
  text: string
}
defineProps<ButtonProps>()
</script>

<template>
  <button>
    {{ text }}
  </button>
</template>
