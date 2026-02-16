<script setup lang="ts">
import type { SelectListOption } from "../..";
import type { TIcon } from "../types";
import type { OverflowTab } from "./types";
import { ref } from "vue";
import { BIcon, BPopper, BPopperContent, BSelectListOption } from "../..";
import OverflowTabs from "./OverflowTabs.vue";

const theTabs: ({ icon: TIcon; label: string } & OverflowTab)[] = [
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

const selectedTabId = ref(theTabs[0].id);
</script>

<template>
  <div class="border-b border-default gap-0">
    <nav class="-mx-2 -mb-px">
      <OverflowTabs
        :selected-tab-id="selectedTabId"
        :tabs="theTabs"
        @select="(tabId:string) => selectedTabId = tabId"
      >
        <template #tab="{ tab, selected, attrs, select }">
          <div class="group flex flex-col justify-center gap-1">
            <button
              v-bind="attrs"
              class="flex items-center gap-1 h-6 px-2 rounded-lg cursor-pointer"
              :class="{
                'text-action border-action': selected,
                'text-tertiary border-default hover:bg-tertiary': !selected,
              }"
              @click="select"
            >
              <BIcon :name="tab.icon" />
              <span class="relative text-xs font-medium truncate">{{ tab.label }}</span>
            </button>
            <div class="flex w-full h-px px-2">
              <div
                class="flex w-full h-full border-b"
                :class="{
                  'border-action': selected,
                  'border-default': !selected,
                }"
              />
            </div>
          </div>
        </template>

        <template #overflow-trigger="{ count, tabs, select }">
          <BPopper trigger="click" placement="bottom-end">
            <template #default="{ visible }">
              <div class="group -mb-px flex flex-col justify-center gap-1">
                <button
                  class="flex items-center gap-1 h-6 px-2 rounded-lg cursor-pointer"
                  :class="{
                    'text-action border-action bg-tertiary': visible,
                    'text-tertiary border-default hover:bg-tertiary': !visible,
                  }"
                >
                  <span class="relative text-xs font-medium truncate">{{ `More (${count})` }}</span>
                  <BIcon :name="visible ? 'chevron-up-small' : 'chevron-down-small'" />
                </button>
                <div class="flex w-full h-px px-2">
                  <div
                    class="flex w-full h-full border-b border-default"
                  />
                </div>
              </div>
            </template>
            <template #content="{ close }">
              <BPopperContent>
                <BSelectListOption
                  v-for="tab in tabs"
                  :key="tab.id"
                  small
                  :option="(tab as SelectListOption)"
                  variant="single"
                  :selected="false"
                  @click="
                    select(tab.id);
                    close();
                  "
                />
              </BPopperContent>
            </template>
          </BPopper>
        </template>
      </OverflowTabs>
    </nav>
  </div>
</template>
