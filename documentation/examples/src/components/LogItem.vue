<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{ data: any }>();

const expanded = ref(false);
const isObject = computed(() => props.data !== null && typeof props.data === "object");
const displayType = computed(() => {
  if (Array.isArray(props.data)) return `Array(${props.data.length})`;
  return "Object";
});
const formattedValue = computed(() => {
  if (typeof props.data === "string") return `"${props.data}"`;
  if (typeof props.data === "undefined") return "undefined";
  if (props.data === null) return "null";
  return String(props.data);
});

function toggle() {
  if (isObject.value) {
    expanded.value = !expanded.value;
  }
}
</script>

<template>
  <div class="ml-2">
    <div v-if="isObject" class="cursor-pointer hover:text-green-300" @click="toggle">
      <span class="mr-1">{{ expanded ? '▼' : '▶' }}</span>
      <span>{{ displayType }}</span>
    </div>

    <div v-else>
      <span class="text-yellow-400 w-full text-wrap whitespace-normal">{{ formattedValue }}</span>
    </div>

    <div v-if="expanded && isObject" class="pl-4 border-l border-green-600 mt-1">
      <div v-for="(value, key) in data" :key="key">
        <strong class="text-blue-400">{{ key }}:</strong>
        <LogItem :data="value" />
      </div>
    </div>
  </div>
</template>
