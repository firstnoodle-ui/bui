<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    value?: boolean;
    offColorClass?: string;
    onColorClass?: string;
    small?: boolean;
  }>(),
  {
    value: false,
    offColorClass: "bg-light",
    onColorClass: "bg-heavy",
    small: false,
  },
);

const emit = defineEmits<{
  (e: "toggle", event: Event): void;
}>();

const knobClass = computed(() => {
  return [props.small ? "h-3 w-3" : "h-5 w-5", props.value ? (props.small ? "translate-x-3" : "translate-x-5") : "translate-x-0"];
});

const backgroundClass = computed(() => {
  return [props.small ? "h-4" : "h-6", props.value ? props.onColorClass : props.offColorClass];
});

const backgroundStyle = computed(() => {
  return {
    width: props.small ? "1.75rem" : "2.75rem",
  };
});
</script>

<template>
  <button
    role="checkbox"
    tabindex="0"
    aria-checked="false"
    :class="backgroundClass"
    class="group relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
    :style="backgroundStyle"
    @click.stop.prevent="emit('toggle', $event)"
    @keydown.space.prevent="emit('toggle', $event)"
    @keydown.enter.prevent="emit('toggle', $event)"
  >
    <span aria-hidden="true" :class="knobClass" class="inline-block rounded-full bg-light shadow transform transition ease-in-out duration-200" />
  </button>
</template>
