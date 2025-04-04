<script setup lang="ts">
import type { TIcon } from "../types";
import { RouterLink } from "vue-router";
import { BIcon } from "../";

withDefaults(
  defineProps<{
    exact?: boolean;
    icon?: TIcon;
    orientation?: "horizontal" | "vertical";
    to: string | { name?: string; path?: string; params?: Record<string, number | string | null>; query?: Record<string, number | string | null> };
  }>(),
  {
    exact: false,
    orientation: "horizontal",
  },
);
</script>

<template>
  <RouterLink v-if="orientation === 'horizontal'" v-slot="{ href, isActive, isExactActive }" :to="to" custom>
    <a :href="href" class="group h-full cursor-pointer py-2">
      <div
        class="h-full flex items-center space-x-2 px-4 rounded-lg bg-opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100"
        :class="{
          'opacity-100 bg-opacity-5': isActive || isExactActive,
          'opacity-50 bg-transparent': !(isActive || isExactActive),
        }"
      >
        <BIcon v-if="icon" :name="icon" />
        <span class="text-sm tracking-wide">
          <slot />
        </span>
      </div>
    </a>
  </RouterLink>
  <RouterLink v-else v-slot="{ href, isActive, isExactActive }" :to="to" custom>
    <a :href="href" class="group h-full cursor-pointer py-2">
      <div
        class="h-10 flex items-center space-x-2 px-4 rounded-lg bg-opacity-0 group-hover:opacity-100 group-hover:bg-opacity-100"
        :class="{
          'opacity-100 bg-opacity-5': isActive || isExactActive,
          'opacity-50 bg-transparent': !(isActive || isExactActive),
        }"
      >
        <BIcon v-if="icon" :name="icon" />
        <span class="text-sm tracking-wide">
          <slot />
        </span>
      </div>
    </a>
  </RouterLink>
</template>
