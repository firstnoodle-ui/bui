<script setup lang="ts">
import { BNotificationBadge } from "../../../notification-badge";

defineProps<{ inside?: boolean }>();
</script>

<template>
  <div
    class="absolute"
    :style="{
      top: inside ? '0.15em' : '-0.3em',
      right: inside ? '0.15em' : '-0.3em',
    }"
  >
    <BNotificationBadge />
  </div>
</template>
