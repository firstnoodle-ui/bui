<script setup lang="ts">
defineProps({
  title: String,
  wip: Boolean,
});
</script>

<template>
  <article class="relative w-full">
    <header class="w-full pb-8">
      <h1>{{ title }}</h1>
      <span v-if="wip" class="absolute inline-flex items-center space-x-2 h-8 px-3 rounded-md bg-rose-pink text-white text-sm shadow">
        <!-- <b-icon name="star" /> -->
        <span>WIP</span>
      </span>
    </header>
    <main class="w-full space-y-20">
      <slot />
    </main>
  </article>
</template>
