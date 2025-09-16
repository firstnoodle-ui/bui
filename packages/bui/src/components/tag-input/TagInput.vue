<script setup lang="ts">
import type { TagInputEntry, TagInputValidator } from "./types";
import { ref } from "vue";
import { BButton } from "../button";
import { BFlexbox } from "../flexbox";
import { EntryTag } from "./components";

const { validators = [] } = defineProps<{ validators?: TagInputValidator[] }>();
const emit = defineEmits<{ (e: "invite", entries: TagInputEntry[]): void }>();

const inputRef = ref<HTMLInputElement>();
const inputValue = ref("");
const parsedEntries = ref<TagInputEntry[]>([]);

const onInvite = () => emit("invite", parsedEntries.value);

/**
 * Exposed method that allows consuming component to pass in input from fx a data import service
 * @param importString 
 */
const importEntries = (importString: string) => {
  parsedEntries.value = [...parsedEntries.value, ...parseInput(importString)];
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
    }
  }
};

const parseInput = (value: string) => {
  return value.trim().split(",").filter(entry => entry.length).map((entry: string, index) => {
    const trimmed = entry.trim();

    // copy array to enable 'early eject' without mutating original
    const error = [...validators].reduce((result:string|null, validator, i, array) => {
      const passed = validator.validate(trimmed);
      if(!passed) {
        result = validator.errorMessage(trimmed);
        array.splice(1);
      }
      return result;
    }, null);

    return {
      id: index + trimmed + Date.now(),
      value: trimmed,
      error
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
  inputRef.value?.focus();
};

defineExpose({ importEntries });
</script>

<template>
  <BFlexbox col class="gap-8">
    <BFlexbox align="start" fullwidth class="gap-2">
      <BFlexbox col align="start" class="flex-1 gap-2">
        <BFlexbox justify="between" class="gap-2">
          <BFlexbox class="gap-2">
            <p class="text-sm text-primary">
              Role
            </p>
            <BButton small label="Teacher" icon-after="chevron-down-small" variant="outlineSubtle" />
          </BFlexbox>
          <BButton small label="Import" icon="download" variant="textSubtle" />
        </BFlexbox>
        <BFlexbox align="start" class="gap-2">
          <BFlexbox class="flex-1 flex-wrap gap-1 px-2 py-1 rounded-lg border border-default focus:border-action focus-within:border-action">
            <EntryTag
              v-for="entry in parsedEntries"
              :key="entry.id"
              :entry="entry"
              @delete="onDeleteEntryById"
            />
            <input
              ref="inputRef"
              type="text"
              :value="inputValue"
              :placeholder="parsedEntries.length ? '' : 'Emails, comma separated'"
              class="flex-1 min-w-0 h-6 text-xs leading-tight bg-transparent focus:outline-hidden"
              @keyup.delete="onDeleteKeyUp"
              @change.stop.prevent
              @input.stop.prevent="onInput"
            >
          </BFlexbox>
        </BFlexbox>
      </BFlexbox>
      <BFlexbox col>
        <div class="h-8" />
        <BButton
          icon="paper-plane"
          label="Invite"
          class="flex-none"
          @click="onInvite"
        />
      </BFlexbox>
    </BFlexbox>
    <BFlexbox col>
      <h4 class="pb-1 border-b border-default">
        Invited
      </h4>
    </BFlexbox>
  </BFlexbox>
</template>
