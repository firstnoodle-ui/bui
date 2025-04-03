<script lang="ts" setup>
import { TestButton } from "@firstnoodle/bui"
// import { TestButton } from "../../../packages/bui/src/index"
</script>

<template>
  <div class="flex gap-1">
    <TestButton text="asd" />
    <TestButton text="johnny" />

    <button class="bg-red-300 hover:bg-pink-500 text-white px-4 py-2 p-2 rounded-lg">
      asd
    </button>
  </div>
  <div class="bg-blue-300" />
</template>
