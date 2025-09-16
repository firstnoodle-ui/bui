<script setup lang="ts">
const {
  value = false,
  offColorClass = "bg-tertiary",
  onColorClass = "bg-action",
  small = false,
  readonly = false,
} = defineProps<{
  value?: boolean;
  offColorClass?: string;
  onColorClass?: string;
  small?: boolean;
  readonly?: boolean;
}>();

const emit = defineEmits<{ (e: "toggle"): void }>();
const onToggle = (_e: Event) => {
  if (readonly) return;
  emit("toggle");
};
</script>

<template>
  <component
    :is="readonly ? 'div' : 'button'"
    role="checkbox"
    :tabindex="readonly ? -1 : 0"
    :aria-checked="value"
    :class="[
      small ? 'h-4' : 'h-6',
      value ? onColorClass : offColorClass,
      readonly ? 'cursor-default' : 'cursor-pointer focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white',
    ]"
    class="group relative inline-flex flex-shrink-0 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200"
    :style="{ width: small ? '1.75rem' : '2.75rem' }"
    @click.stop.prevent="onToggle"
    @keydown.space.prevent="onToggle"
    @keydown.enter.prevent="onToggle"
  >
    <span
      aria-hidden="true"
      :class="[
        small ? 'h-3 w-3' : 'h-5 w-5',
        value ? (small ? 'translate-x-3' : 'translate-x-5') : 'translate-x-0',
      ]"
      class="inline-block rounded-full bg-primary shadow-sm transform transition ease-in-out duration-200"
    />
  </component>
</template>
