<script setup lang="ts">
const { small = false } = defineProps<{ label?: string; small?: boolean }>();
</script>

<template>
  <section
    class="relative w-full border-t border-default"
    :class="{ 'first:border-t-0 first:pt-0': !label, 'py-2': small, 'py-4': !small }"
  >
    <div
      v-if="label"
      :style="{ top: small ? '-0.55rem' : '-0.63rem' }"
      class="absolute bg-primary px-2 font-medium text-tertiary"
      :class="{ 'text-[10px]': small, 'text-xs': !small }"
    >
      {{ label }}
    </div>
    <slot />
  </section>
</template>
