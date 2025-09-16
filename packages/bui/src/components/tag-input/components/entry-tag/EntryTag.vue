<script setup lang="ts">
import type { TagInputEntry } from "../../types";
import { hasValue } from "../../../../utils/type-utils";
import { BFlexbox } from "../../../flexbox";
import { BIcon } from "../../../icon";
import { BTooltip } from "../../../tooltip";

const { entry } = defineProps<{ entry: TagInputEntry }>();
const emit = defineEmits<{ (e: "delete", id: string): void }>();

const onDelete = () => emit("delete", entry.id);
</script>

<template>
  <BTooltip :text="entry.error">
    <BFlexbox
      :id="entry.id"
      tabindex="1"
      class="gap-0.5 h-6 pl-1 pr-0.5 rounded-md border cursor-default"
      :class="{
        'border-strong text-primary': !hasValue(entry.error),
        'border-red-400 text-red-400 focus:bg-red-400 focus:text-white': hasValue(entry.error),
      }"
      @keyup.delete="onDelete"
    >
      <div class="text-xs">
        {{ entry.value }}
      </div>
      <button class="group cursor-pointer w-4 h-4 rounded hover:bg-secondary active:bg-tertiary" @click="onDelete">
        <BIcon name="close" class="text-tertiary dark:text-muted group-hover:text-primary" />
      </button>
    </BFlexbox>
  </BTooltip>
</template>
