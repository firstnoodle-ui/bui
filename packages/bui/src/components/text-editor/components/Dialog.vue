<script setup lang="ts">
import { BPopperContent } from "../../popper";
</script>

<template>
  <Teleport to="#modals">
    <BPopperContent class="w-96">
      <div class="p-4 space-y-2">
        <slot />
      </div>
    </BPopperContent>
  </Teleport>
</template>
