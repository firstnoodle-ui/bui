<script lang="ts" setup>
import { TestButton, TestButtonFour, TestButtonThree, TestButtonTwo } from "@firstnoodle/bui"
// import { TestButton } from "../../../packages/bui/src/index"
</script>

<template>
  <div class="flex-col gap-2 flex">
    <TestButton text="one - annoying no props visible, can see type on F12 cool" />
    <TestButtonTwo text="Two - annoying no props visible, can see props on F12" />
    <TestButtonThree text="Three - annoying no props visible, can see imported props on F12" />
    <TestButtonFour text="four - annoying no props visible, import and export type visible on F12" />

    <button class="bg-red-300 hover:bg-pink-500 text-white px-4 py-2 p-2 rounded-lg">
      From app
    </button>
  </div>
  <div class="bg-blue-300" />
</template>
