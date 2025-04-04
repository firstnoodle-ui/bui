<script setup lang="ts">
defineProps({ title: String });
</script>

<template>
  <section class="w-full border border-default space-y-2">
    <header class="p-4 border-b border-default bg-sand-grey-40">
      <h5>{{ title }}</h5>
    </header>
    <main class="p-4 text-primary">
      <slot />
    </main>
  </section>
</template>
