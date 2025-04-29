<script setup lang="ts"></script>

<template>
  <Teleport to="#modals">
    <div class="pointer-events-auto absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-sm bg-black/15">
      <div class="px-8 py-6 bg-1 rounded-lg shadow-sm-xl space-y-2">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
