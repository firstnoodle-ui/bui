<script setup lang="ts">
import type { TIcon } from "../types";

const { height = 16, width = 16, fillColor = "black" } = defineProps<{ name: TIcon; height?: number; width?: number; fillColor?: string }>();
</script>

<template>
  <svg :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`" fill="none" xmlns="http://www.w3.org/2000/svg">
    <template v-if="name === 'trash'">
      <path d="M11 13V5H10V13H11Z" :fill="fillColor" />
      <path d="M6 5V13H5V5H6Z" :fill="fillColor" />
      <path d="M8.5 13V5H7.5V13H8.5Z" :fill="fillColor" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 2H11V0H5V2H1V3H2V16H14V3H15V2ZM3 3H13V15H3V3ZM6 1H10V2H6V1Z" :fill="fillColor" />
    </template>
    <template v-else-if="name === 'home'">
      <path d="M8.00008 0.924072L15.245 5.06591L14.7487 5.9341L13.9999 5.50607L14 15H9.00002V8.99998H7.00002V15H2.00002L1.99995 5.50407L1.24809 5.9341L0.751953 5.06586L8.00008 0.924072ZM7.99902 2.07598L2.99995 4.93307V14H6.00002V7.99998H10V14H13V4.93507L7.99902 2.07598Z" :fill="fillColor" />
    </template>
  </svg>
</template>
