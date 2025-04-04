<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { BLoadSpinner } from "../";

const emit = defineEmits(["intersect"]);
const triggerRef = ref<HTMLDivElement>();
const observer = ref<IntersectionObserver | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(
    ([e]) => e.isIntersecting && emit("intersect"),
    { threshold: 0.01 },
  );
  observer.value.observe(triggerRef.value!);
});

onUnmounted(() => observer.value && observer.value.disconnect());
</script>

<template>
  <div ref="triggerRef" class="w-full h-16 flex items-center justify-center bg-white">
    <slot v-if="$slots.default" />
    <BLoadSpinner v-else class="w-6 h-6 text-granite-grey" />
  </div>
</template>
