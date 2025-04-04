<script setup lang="ts">
import { onMounted } from "vue";
import "./style.scss";

const props = defineProps<{ delayIndex: number }>();

onMounted(() => {
  if (props.delayIndex < 1 || props.delayIndex > 20) {
    throw new Error("delayIndex has to be between 1 and 20");
  }
});
</script>

<template>
  <div class="first-paint rounded" :class="`delay-${delayIndex}`">
    <div class="opacity-0">
      <slot v-if="$slots.default" />
      <span v-else>Some random text</span>
    </div>
  </div>
</template>
