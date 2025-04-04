<script setup lang="ts">
import { ref } from "vue";
// import { useTrapFocus } from "@/bui/composables";

const windowRef = ref<HTMLDivElement>();
// const { trapFocus } = useTrapFocus(windowRef);

// defineExpose({
//   trapFocus: () => {
//     Boolean(windowRef.value) && windowRef.value!.focus();
//     trapFocus();
//   }
// });
</script>

<template>
  <div ref="windowRef" tabindex="0" class="w-full flex flex-col bg-light shadow-xl rounded-xl focus:outline-none">
    <slot />
  </div>
</template>
