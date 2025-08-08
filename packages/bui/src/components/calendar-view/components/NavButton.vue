<script setup lang="ts">
import type { TIcon } from "../../types";
import { BButton } from "../../button";

defineProps<{ icon: TIcon }>();

const emit = defineEmits(["click"]);
</script>

<template>
  <BButton
    :icon="icon"
    variant="textSubtle"
    @click="emit('click')"
  />
</template>
