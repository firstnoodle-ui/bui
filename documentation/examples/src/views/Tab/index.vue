<script setup lang="ts">
import type { TIcon } from "@firstnoodle-ui/bui";
import { BCollapse, BTab, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const selected = ref("News");

// Collapse control state
const globalCollapseOpen = ref(true);
const tab1CollapseOpen = ref(false);
const tab2CollapseOpen = ref(false);
const tab3CollapseOpen = ref(false);
const tab4CollapseOpen = ref(false);

// Global PropControls (applied to all tabs)
const globalType = ref<"default" | "pill">("default");
const globalGrow = ref(false);
const globalSize = ref<"small" | "default">("default");

// Tab 1 (News) PropControls
const tab1Name = ref("News");
const tab1Icon = ref<TIcon>("news");
const tab1Notification = ref(false);
const tab1Disabled = ref(false);

// Tab 2 (Products) PropControls
const tab2Name = ref("Products");
const tab2Icon = ref<TIcon>("box");
const tab2Notification = ref(true);
const tab2Disabled = ref(false);

// Tab 3 (Messages) PropControls
const tab3Name = ref("Messages");
const tab3Icon = ref<TIcon>("message");
const tab3Notification = ref(false);
const tab3Disabled = ref(false);

// Tab 4 (Notifications) PropControls
const tab4Name = ref("Notifications");
const tab4Icon = ref<TIcon>("bell");
const tab4Notification = ref(false);
const tab4Disabled = ref(false);

const typeOptions = ["default", "pill"];
const sizeOptions = ["small", "default"];
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <nav class="flex items-center w-full">
        <BTab
          :name="tab1Name"
          :icon="tab1Icon"
          :grow="globalGrow"
          :notification="tab1Notification"
          :type="globalType"
          :size="globalSize"
          :disabled="tab1Disabled"
          :selected="selected === tab1Name"
          @select="selected = tab1Name; print(`Selected: ${tab1Name}`)"
        />
        <BTab
          :name="tab2Name"
          :icon="tab2Icon"
          :grow="globalGrow"
          :notification="tab2Notification"
          :type="globalType"
          :size="globalSize"
          :disabled="tab2Disabled"
          :selected="selected === tab2Name"
          @select="selected = tab2Name; print(`Selected: ${tab2Name}`)"
        />
        <BTab
          :name="tab3Name"
          :icon="tab3Icon"
          :grow="globalGrow"
          :notification="tab3Notification"
          :type="globalType"
          :size="globalSize"
          :disabled="tab3Disabled"
          :selected="selected === tab3Name"
          @select="selected = tab3Name; print(`Selected: ${tab3Name}`)"
        />
        <BTab
          :name="tab4Name"
          :icon="tab4Icon"
          :grow="globalGrow"
          :notification="tab4Notification"
          :type="globalType"
          :size="globalSize"
          :disabled="tab4Disabled"
          :selected="selected === tab4Name"
          @select="selected = tab4Name; print(`Selected: ${tab4Name}`)"
        />
      </nav>
    </template>
    <template #controls>
      <div class="space-y-2">
        <!-- Global Controls -->
        <BCollapse :open="globalCollapseOpen" @toggle="globalCollapseOpen = !globalCollapseOpen">
          <template #header>
            <h3 class="text-sm font-bold text-primary">
              Global Settings
            </h3>
          </template>
          <template #content>
            <div class="space-y-2 p-4">
              <PropControlSelect name="Type" :value="globalType" :options="typeOptions" @select="(option: 'default' | 'pill') => globalType = option">
                Tab styling type applied to all tabs
              </PropControlSelect>
              <PropControlSelect name="Size" :value="globalSize" :options="sizeOptions" @select="(option: 'small' | 'default') => globalSize = option">
                Tab size applied to all tabs
              </PropControlSelect>
              <PropControlBoolean name="Grow" :value="globalGrow" @toggle="globalGrow = !globalGrow">
                All tabs take up available space
              </PropControlBoolean>
            </div>
          </template>
        </BCollapse>

        <!-- Tab 1 Controls -->
        <BCollapse :open="tab1CollapseOpen" @toggle="tab1CollapseOpen = !tab1CollapseOpen">
          <template #header>
            <h3 class="text-sm font-bold text-primary">
              Tab 1
            </h3>
          </template>
          <template #content>
            <div class="space-y-2 p-4">
              <PropControlString name="Name" :value="tab1Name" @change="(value: string) => tab1Name = value" />
              <PropControlSelect name="Icon" :value="tab1Icon" :options="[...icons]" @select="(option: TIcon) => tab1Icon = option" />
              <PropControlBoolean name="Notification" :value="tab1Notification" @toggle="tab1Notification = !tab1Notification">
                Show notification badge
              </PropControlBoolean>
              <PropControlBoolean name="Disabled" :value="tab1Disabled" @toggle="tab1Disabled = !tab1Disabled">
                Disable tab interaction
              </PropControlBoolean>
            </div>
          </template>
        </BCollapse>

        <!-- Tab 2 Controls -->
        <BCollapse :open="tab2CollapseOpen" @toggle="tab2CollapseOpen = !tab2CollapseOpen">
          <template #header>
            <h3 class="text-sm font-bold text-primary">
              Tab 2
            </h3>
          </template>
          <template #content>
            <div class="space-y-2 p-4">
              <PropControlString name="Name" :value="tab2Name" @change="(value: string) => tab2Name = value" />
              <PropControlSelect name="Icon" :value="tab2Icon" :options="[...icons]" @select="(option: TIcon) => tab2Icon = option" />
              <PropControlBoolean name="Notification" :value="tab2Notification" @toggle="tab2Notification = !tab2Notification">
                Show notification badge
              </PropControlBoolean>
              <PropControlBoolean name="Disabled" :value="tab2Disabled" @toggle="tab2Disabled = !tab2Disabled">
                Disable tab interaction
              </PropControlBoolean>
            </div>
          </template>
        </BCollapse>

        <!-- Tab 3 Controls -->
        <BCollapse :open="tab3CollapseOpen" @toggle="tab3CollapseOpen = !tab3CollapseOpen">
          <template #header>
            <h3 class="text-sm font-bold text-primary">
              Tab 3
            </h3>
          </template>
          <template #content>
            <div class="space-y-2 p-4">
              <PropControlString name="Name" :value="tab3Name" @change="(value: string) => tab3Name = value" />
              <PropControlSelect name="Icon" :value="tab3Icon" :options="[...icons]" @select="(option: TIcon) => tab3Icon = option" />
              <PropControlBoolean name="Notification" :value="tab3Notification" @toggle="tab3Notification = !tab3Notification">
                Show notification badge
              </PropControlBoolean>
              <PropControlBoolean name="Disabled" :value="tab3Disabled" @toggle="tab3Disabled = !tab3Disabled">
                Disable tab interaction
              </PropControlBoolean>
            </div>
          </template>
        </BCollapse>

        <!-- Tab 4 Controls -->
        <BCollapse :open="tab4CollapseOpen" @toggle="tab4CollapseOpen = !tab4CollapseOpen">
          <template #header>
            <h3 class="text-sm font-bold text-primary">
              Tab 4
            </h3>
          </template>
          <template #content>
            <div class="space-y-2 p-4">
              <PropControlString name="Name" :value="tab4Name" @change="(value: string) => tab4Name = value" />
              <PropControlSelect name="Icon" :value="tab4Icon" :options="[...icons]" @select="(option: TIcon) => tab4Icon = option" />
              <PropControlBoolean name="Notification" :value="tab4Notification" @toggle="tab4Notification = !tab4Notification">
                Show notification badge
              </PropControlBoolean>
              <PropControlBoolean name="Disabled" :value="tab4Disabled" @toggle="tab4Disabled = !tab4Disabled">
                Disable tab interaction
              </PropControlBoolean>
            </div>
          </template>
        </BCollapse>
      </div>
    </template>
  </ComponentPage>
</template>
