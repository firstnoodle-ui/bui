<script setup lang="ts">
import { BIcon } from "../";

const props = withDefaults(
  defineProps<{
    deletable?: boolean;
    selected?: boolean;
    stopPropagation?: boolean;
  }>(),
  {
    deletable: false,
    selected: false,
    stopPropagation: false,
  },
);

const emit = defineEmits(["click", "delete"]);

const onClick = (event: Event) => {
  if (props.stopPropagation) {
    event.stopPropagation();
    event.preventDefault();
  }
  emit("click");
};

// TODO key.enter event stopPropagation
</script>

<template>
  <button
    class="h-7 px-2 inline-flex items-center space-x-1 rounded-lg focus:outline-none border border-transparent focus-visible:border-true-blue"
    :class="{
      'bg-light-blue text-white hover:bg-light-blue-darker': selected,
      'bg-light-blue-40 text-light-blue hover:bg-light-blue-15 hover:text-light-blue-darker': !selected,
    }"
    @click="onClick"
  >
    <span class="truncate"><slot /></span>
    <button
      v-if="deletable"
      class="w-4 h-4 flex items-center justify-center rounded-md focus:outline-none border border-transparent focus-visible:border-true-blue opacity-75 hover:opacity-100"
      :class="{
        'hover:bg-black hover:bg-opacity-20': selected,
        'hover:bg-light-blue hover:text-light-blue-15': !selected,
      }"
      @click.stop.prevent="emit('delete')"
    >
      <BIcon name="close" />
    </button>
  </button>
</template>
