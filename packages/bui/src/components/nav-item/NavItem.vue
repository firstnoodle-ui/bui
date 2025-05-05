<script setup lang="ts">
import type { TIcon } from "../types";
import { BIcon } from "../";

withDefaults(
  defineProps<{
    exact?: boolean;
    icon?: TIcon;
    orientation?: "horizontal" | "vertical";
    to: string | { name?: string; path?: string; params?: Record<string, number | string | null>; query?: Record<string, number | string | null> };
    isActive?: boolean;
    isExactActive?: boolean;
    href?: string;
  }>(),
  {
    exact: false,
    orientation: "horizontal",
    isActive: false,
    isExactActive: false,
    href: "/",
  },
);

const emit = defineEmits<{
  (e: "navigate", to: string): void;
}>();
</script>

<template>
  <template v-if="orientation === 'horizontal'">
    <a class="group h-full cursor-pointer py-2" @click="emit('navigate', href)">
      <div
        class="h-full flex items-center space-x-2 px-4 rounded-lg group-hover:opacity-100"
        :class="{
          'opacity-100': isActive || isExactActive,
          'opacity-50 bg-transparent': !(isActive || isExactActive),
        }"
      >
        <BIcon v-if="icon" :name="icon" />
        <span class="text-sm tracking-wide">
          <slot />
        </span>
      </div>
    </a>
  </template>
  <template v-else>
    <a class="group h-full cursor-pointer py-2" @click="emit('navigate', href)">
      <div
        class="h-10 flex items-center space-x-2 px-4 rounded-lg group-hover:opacity-100"
        :class="{
          'opacity-100': isActive || isExactActive,
          'opacity-50 bg-transparent': !(isActive || isExactActive),
        }"
      >
        <BIcon v-if="icon" :name="icon" />
        <span class="text-sm tracking-wide">
          <slot />
        </span>
      </div>
    </a>
  </template>
</template>
