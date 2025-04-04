<script setup lang="ts">
const emit = defineEmits(["transition-after-enter"]);
</script>

<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-300 delay-100"
    enter-from-class="translate-y-2 opacity-0"
    enter-to-class=""
    leave-active-class="transform transition ease-in-out duration-100"
    leave-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-2 opacity-0"
    @after-enter="emit('transition-after-enter')"
  >
    <slot />
  </transition>
</template>
