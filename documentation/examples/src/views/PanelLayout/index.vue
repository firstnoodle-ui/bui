<script setup lang="ts">
import { BPanelLayout } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
} from "../../components";

// PropControl state
const borders = ref(true);
const orientation = ref<"horizontal" | "vertical">("horizontal");
const orientationOptions = ["horizontal", "vertical"];

const startPanelSize = ref(80);
const startPanelVisible = ref(true);
const startPanelDraggable = ref(true);

const endPanelSize = ref(80);
const endPanelVisible = ref(true);
const endPanelDraggable = ref(true);
</script>

<template>
  <ComponentPage>
    <template #default>
      <div style="height: 500px" class="flex-1 w-full border border-default">
        <BPanelLayout
          borders
          :orientation="orientation"
          :start-panel-size="startPanelSize"
          :end-panel-size="endPanelSize"
          :start-panel-visible="startPanelVisible"
          :end-panel-visible="endPanelVisible"
          :start-panel-draggable="startPanelDraggable"
          :end-panel-draggable="endPanelDraggable"
        >
          <template #start-panel>
            <div class="p-4">
              Start
            </div>
          </template>
          <template #main>
            <div class="p-4">
              Main Content Area
            </div>
          </template>
          <template #end-panel>
            <div class="p-4">
              End
            </div>
          </template>
        </BPanelLayout>
      </div>
    </template>
    <template #controls>
      <PropControlBoolean name="Borders" :value="borders" @toggle="borders = !borders">
        Show borders
      </PropControlBoolean>
      <PropControlSelect name="Orientation" :value="orientation" :options="orientationOptions" @select="(option: 'horizontal' | 'vertical') => orientation = option">
        Direction of pagination controls
      </PropControlSelect>
      <PropControlBoolean name="Start Panel Visible" :value="startPanelVisible" @toggle="startPanelVisible = !startPanelVisible">
        Start panel visible
      </PropControlBoolean>
      <PropControlBoolean name="Start Panel Draggable" :value="startPanelDraggable" @toggle="startPanelDraggable = !startPanelDraggable">
        Make start panel draggable
      </PropControlBoolean>
      <PropControlBoolean name="End Panel Visible" :value="endPanelVisible" @toggle="endPanelVisible = !endPanelVisible">
        End panel visible
      </PropControlBoolean>
      <PropControlBoolean name="End Panel Draggable" :value="endPanelDraggable" @toggle="endPanelDraggable = !endPanelDraggable">
        End start panel draggable
      </PropControlBoolean>
    </template>
  </ComponentPage>
</template>
