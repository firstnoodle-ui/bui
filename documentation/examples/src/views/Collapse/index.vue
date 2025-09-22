<script setup lang="ts">
import { BButton, BCollapse } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
} from "../../components";

const selectedId = ref<string | null>(null);

// PropControl state
const alignment = ref<"left" | "right">("right");
const borderClassOpen = ref("border-strong");
const borderClassClosed = ref("border-default");
const headerBgClass = ref("bg-primary");
const open = ref(false);
const sticky = ref(false);

const alignmentOptions = ["left", "right"];
const borderClassOptions = ["border-weak", "border-default", "border-strong", "border-action"];
const headerBgClassOptions = ["bg-primary", "bg-secondary", "bg-tertiary"];

const onToggle = (id: string) => {
  if (selectedId.value === id) {
    selectedId.value = null;
  }
  else {
    selectedId.value = id;
  }
};
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <BCollapse
        :open="open"
        :alignment="alignment"
        :border-class-open="borderClassOpen"
        :border-class-closed="borderClassClosed"
        :header-bg-class="headerBgClass"
        :sticky="sticky"
        @toggle="
          open = !open;
          print('@toggle')
        "
      >
        <template #header>
          <section class="flex items-center justify-between w-full h-full">
            <div class="font-medium">
              Fruit
            </div>
            <div>
              <BButton variant="textSubtle" icon="download" />
              <BButton variant="textSubtle" icon="trash" />
            </div>
          </section>
        </template>
        <template #content>
          <main class="pl-8">
            <BCollapse header-bg-class="bg-light-blue-40">
              <template #header>
                <section class="flex items-center justify-between w-full h-full">
                  <div class="font-medium">
                    Arrow disappears if content slot is empty
                  </div>
                  <div>
                    <BButton variant="textSubtle" icon="download" />
                    <BButton variant="textSubtle" icon="trash" />
                  </div>
                </section>
              </template>
            </BCollapse>
            <BCollapse id="red" :open="selectedId === 'red'" @toggle="onToggle">
              <template #header>
                <section class="flex items-center justify-between w-full h-full">
                  <div class="font-medium">
                    Red Fruit
                  </div>
                  <div>
                    <BButton variant="textSubtle" icon="download" />
                    <BButton variant="textSubtle" icon="trash" />
                  </div>
                </section>
              </template>
              <template #content>
                <main class="pl-8 h-10 flex items-center text-sm">
                  Apples
                </main>
              </template>
            </BCollapse>
            <BCollapse id="yellow" :open="selectedId === 'yellow'" @toggle="onToggle">
              <template #header>
                <section class="flex items-center justify-between w-full h-full">
                  <div class="font-medium">
                    Yellow Fruit
                  </div>
                  <div>
                    <BButton variant="textSubtle" icon="download" />
                    <BButton variant="textSubtle" icon="trash" />
                  </div>
                </section>
              </template>
              <template #content>
                <main class="pl-8 h-10 flex items-center">
                  Bananas
                </main>
              </template>
            </BCollapse>
          </main>
        </template>
      </BCollapse>
    </template>
    <template #controls>
      <PropControlBoolean name="Open" :value="open" @toggle="open = !open">
        Controls whether the collapse section is expanded
      </PropControlBoolean>
      <PropControlBoolean name="Sticky" :value="sticky" @toggle="sticky = !sticky">
        Makes header sticky when scrolling within expanded content
      </PropControlBoolean>
      <PropControlSelect name="Alignment" :value="alignment" :options="alignmentOptions" @select="(option: 'left' | 'right') => alignment = option">
        Position of header content relative to chevron icon
      </PropControlSelect>
      <PropControlSelect name="Border class (Open)" :value="borderClassOpen" :options="borderClassOptions" @select="(option: string) => borderClassOpen = option">
        Border styling when collapse is open
      </PropControlSelect>
      <PropControlSelect name="Border class (Closed)" :value="borderClassClosed" :options="borderClassOptions" @select="(option: string) => borderClassClosed = option">
        Border styling when collapse is closed
      </PropControlSelect>
      <PropControlSelect name="Header background" :value="headerBgClass" :options="headerBgClassOptions" @select="(option: string) => headerBgClass = option">
        Background color class for the header
      </PropControlSelect>
    </template>
  </ComponentPage>
</template>
