<script setup lang="ts">
import type { Tab } from "./types";
import { ref } from "vue";
import { BFlexbox } from "../../..";
import NewTab from "./NewTab.vue";

const tabs: Tab[] = [
  {
    id: "questions",
    icon: "question",
    label: "Questions",
  },
  {
    id: "files",
    icon: "paper",
    label: "Files",
  },
  {
    id: "agents",
    icon: "agent",
    label: "Agents",
  },
  {
    id: "agent-flows",
    icon: "agent-flow",
    label: "AgentFlows",
  },
  {
    id: "enrollments",
    icon: "team",
    label: "Enrollments",
  },
];
const selectedTab = ref<Tab>(tabs[0]);
</script>

<template>
  <BFlexbox tag="nav" class="-mx-2">
    <NewTab
      v-for="tab in tabs"
      :key="tab.id"
      :tab="tab"
      :selected="selectedTab.id === tab.id"
      @select="(tab:Tab) => selectedTab = tab"
    />
  </BFlexbox>
</template>
