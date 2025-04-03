<script lang="ts" setup>
import { BApplicationWrapper, BHorizontalLayout } from "@firstnoodle/bui"
</script>

<template>
  <BApplicationWrapper>
    <BHorizontalLayout>
      <template #aside-left>
        <div class="w-64 h-full bg-gray-200">
          <p>this is aside left</p>
        </div>
      </template>
      <template #main>
        <div class="w-full h-full bg-gray-300">
          <p>this is main</p>
        </div>
      </template>
      <template #aside-right>
        <div class="w-64 h-full bg-gray-400">
          <p>this is aside right</p>
        </div>
      </template>
    </BHorizontalLayout>
  </BApplicationWrapper>
</template>
