<script setup lang="ts">
import { BButton, BCollapse } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const rootOpen = ref(false);
const selectedId = ref<string | null>(null);

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
  <ComponentPage title="Collapse">
    <ComponentPageSection title="In this example only one child can be open">
      <BCollapse :open="rootOpen" @toggle="rootOpen = !rootOpen">
        <template #header>
          <section class="flex items-center justify-between w-full h-full">
            <div class="font-medium">
              Fruit
            </div>
            <div>
              <BButton icon="download" />
              <BButton icon="trash" />
            </div>
          </section>
        </template>
        <template #content>
          <main class="pl-8">
            <BCollapse header-bg-class="bg-light-blue-40">
              <template #header>
                <section class="flex items-center justify-between w-full h-full">
                  <div class="font-medium">
                    Arrow disappears if content slot is empty + header-bg-class
                  </div>
                  <div>
                    <BButton icon="download" />
                    <BButton icon="trash" />
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
                    <BButton icon="download" />
                    <BButton icon="trash" />
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
                    <BButton icon="download" />
                    <BButton icon="trash" />
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
    </ComponentPageSection>
  </ComponentPage>
</template>
