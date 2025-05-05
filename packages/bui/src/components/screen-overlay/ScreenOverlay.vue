<script setup lang="ts">
import type { TOverlayType } from "../types";
import { onBeforeMount, reactive, ref } from "vue";

const props = withDefaults(
  defineProps<{
    show?: boolean;
    type?: TOverlayType;
  }>(),
  {
    show: false,
    type: "default",
  },
);

const emit = defineEmits(["click", "close"]);

const classes = ref("");
const styles = reactive({ backdropFilter: "" });

onBeforeMount(() => {
  if (props.type === "default") {
    classes.value = "bg-black/25 dark:bg-black/50";
    styles.backdropFilter = "";
  }
  else if (props.type === "blurred") {
    classes.value = "bg-black/25";
    styles.backdropFilter = "blur(3px)";
  }
});
</script>

<template>
  <transition
    enter-active-class="transform transition ease-in-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class=""
    leave-active-class="transform transition ease-in-out duration-500"
    leave-class="translate-y-0 opacity-100"
    leave-to-class="opacity-0"
    @after-leave="emit('close')"
  >
    <div
      v-show="show"
      class="z-40 fixed w-screen h-screen top-0 left-0 flex items-start justify-center pointer-events-auto"
      :class="classes"
      :style="styles"
      @mousedown.self="emit('click')"
    >
      <slot />
    </div>
  </transition>
</template>
