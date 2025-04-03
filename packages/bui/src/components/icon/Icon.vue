<script setup lang="ts">
import type { TIcon } from "../types";

defineProps<{ name: TIcon }>();
</script>

<template>
  <span class="icon" :class="`icon-${name}`" />
</template>
