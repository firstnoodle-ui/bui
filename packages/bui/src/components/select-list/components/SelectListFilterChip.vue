<script setup lang="ts">
const { filterCount, label } = defineProps<{
  filterCount?: number;
  label: string;
  selected: boolean;
}>();
</script>

<template>
  <button
    class="
            group
            flex flex-shrink-0 items-center justify-center gap-1 w-fit h-8 py-2 rounded-x-large
            text-ui-button-12
            focus-visible:outline-focus focus-visible:outline focus-visible:outline-offset-[1px]
        "
    :class="{
      'bg-primary hover:bg-primary-hover active:bg-primary-active text-white': selected,
      'bg-base-light hover:bg-base-medium active:bg-base-heavy text-primary hover:text-primary-hover active:text-primary-active': !selected,
      'pl-3 pr-1.5': filterCount,
      'px-3': !filterCount,
    }"
  >
    {{ label }}

    <template v-if="filterCount">
      <div
        class="pointer-events-none select-none flex items-center h-5 px-2 rounded-full text-ui-label-12-bold text-white bg-primary-hover group-hover:bg-primary-active"
      >
        {{ filterCount }}
      </div>
    </template>
  </button>
</template>
