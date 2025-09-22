<script setup lang="ts">
import type { TagInputEntry, TagInputValidator } from "./types";
import { ref } from "vue";
import { BFlexbox } from "../flexbox";
import { EntryTag } from "./components";

const { placeholder = "Enter value, comma separated", validators = [] } = defineProps<{ placeholder?: string; validators?: TagInputValidator[] }>();
const emit = defineEmits<{ (e: "update:entries", entries: TagInputEntry[]): void }>();

const inputElement = ref<HTMLInputElement>();
const inputValue = ref("");
const parsedEntries = ref<TagInputEntry[]>([]);

/**
 * Exposed method that allows consuming component to pass in input from fx a data import service
 * @param importString
 */
const importEntries = (importString: string) => {
  parsedEntries.value = [...parsedEntries.value, ...parseInput(importString)];
  emit("update:entries", parsedEntries.value);
};

/**
 * Update inputValue and if comma (',') is hit, parse inputValue and reset
 */
const onInput = (event: Event) => {
  if (event.target) {
    inputValue.value = (event.target as HTMLInputElement).value;
    const char = (event as InputEvent).data;

    if (char === "," || inputValue.value.includes(",")) {
      parsedEntries.value = [...parsedEntries.value, ...parseInput(inputValue.value)];
      inputValue.value = "";
      emit("update:entries", parsedEntries.value);
    }
  }
};

const parseInput = (value: string) => {
  return value.trim().split(",").filter(entry => entry.length).map((entry: string, index) => {
    const trimmed = entry.trim();

    // copy array to enable 'early eject' without mutating original
    const error = [...validators].reduce((result: string | null, validator, i, array) => {
      const passed = validator.validate(trimmed);
      if (!passed) {
        result = validator.errorMessage(trimmed);
        array.splice(1);
      }
      return result;
    }, null);

    return {
      id: index + trimmed + Date.now(),
      value: trimmed,
      error,
    };
  });
};

/**
 * If the user hits delete key and there are tags present,
 * the last tag should be focused and will thus be ready to be deleted on next delete key stroke (the tag element has a listener for that)
 */
const onDeleteKeyUp = () => {
  if (inputValue.value.length || !parsedEntries.value.length) return;
  const id = parsedEntries.value[parsedEntries.value.length - 1].id;
  const outer = document.getElementById(id);
  if (!outer) return;
  outer.focus();
};

/**
 * Delete an entry by id
 * @param id
 */
const onDeleteEntryById = (id: string) => {
  parsedEntries.value = parsedEntries.value.filter(entry => entry.id !== id);
  emit("update:entries", parsedEntries.value);
  inputElement.value?.focus();
};

defineExpose({ importEntries, inputElement });
</script>

<template>
  <BFlexbox class="flex-1 flex-wrap gap-1 px-2 py-1">
    <EntryTag
      v-for="entry in parsedEntries"
      :key="entry.id"
      :entry="entry"
      @delete="onDeleteEntryById"
    />
    <input
      ref="inputElement"
      type="text"
      :value="inputValue"
      :placeholder="parsedEntries.length ? '' : placeholder"
      class="flex-1 min-w-0 h-6 text-xs leading-tight bg-transparent focus:outline-hidden"
      @keyup.delete="onDeleteKeyUp"
      @change.stop.prevent
      @input.stop.prevent="onInput"
    >
  </BFlexbox>
</template>
