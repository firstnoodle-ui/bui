<script setup lang="ts">
import { ref } from "vue";
// import { useTrapFocus } from "@/bui/composables";

const windowRef = ref<HTMLDivElement>();
// const { trapFocus } = useTrapFocus(windowRef);

defineExpose({
  focus: windowRef.value?.focus()
});
//   trapFocus: () => {
//     Boolean(windowRef.value) && windowRef.value!.focus();
//     trapFocus();
//   }
// });
</script>

<template>
  <div ref="windowRef" tabindex="0" class="w-full flex flex-col bg-primary shadow-xl border border-default rounded-xl focus:outline-hidden">
    <slot />
  </div>
</template>
