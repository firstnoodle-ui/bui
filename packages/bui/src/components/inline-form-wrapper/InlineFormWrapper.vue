<script setup lang="ts">
import { BFlexbox } from "..";
</script>

<template>
  <BFlexbox
    col
    tabindex="0"
    class="border border-default bg-primary rounded-lg focus:outline-none focus-within:shadow-sm focus-within:border-action"
  >
    <slot />
    <BFlexbox tag="footer" justify="between" class="gap-2 px-2 py-2 border-t border-default">
      <BFlexbox class="flex-1">
        <slot name="footer-left" />
      </BFlexbox>
      <BFlexbox class="flex-none">
        <slot name="footer-right" />
      </BFlexbox>
    </BFlexbox>
  </BFlexbox>
</template>
