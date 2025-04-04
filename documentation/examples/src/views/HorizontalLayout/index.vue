<!-- eslint-disable no-console -->
<script setup lang="ts">
import { BButton, BHorizontalLayout } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const asideLeftWidth = ref(182);
const asideLeftVisible = ref(true);
const asideRightWidth = ref(182);
const asideRightVisible = ref(true);
const borders = ref(false);

const onAsideLeftTransitionEnd = () => console.log("aside left transition done");
const onAsideRightTransitionEnd = () => console.log("aside right transition done");
const resizeLeftAside = () => {
  asideLeftWidth.value = asideLeftWidth.value === 182 ? 96 : 182;
};
const resizeRightAside = () => {
  asideRightWidth.value = asideRightWidth.value === 182 ? 96 : 182;
};

const onToggleBorders = () => {
  borders.value = !borders.value;
  console.log(borders.value);
};
</script>

<template>
  <ComponentPage title="HorizontalLayout">
    <ComponentPageSection title="Description">
      <section class="css-rich-text text-sm mb-4">
        <p>
          A component with a <strong>$main</strong> slot (required) and two (optional) aside slots: <strong>$aside-left </strong>and
          <strong>$aside-right</strong>.
        </p>
        <p>The two aside slots can be resized and collapsed/expanded - try the buttons below.</p>
        <p><br class="ProseMirror-trailingBreak"></p>
        <p>This component is used together with VerticalLayout to create a customizable application layout.</p>
        <p><br class="ProseMirror-trailingBreak"></p>
      </section>
      <section class="flex items-center justify-between py-4">
        <div class="space-x-2">
          <BButton bordered label="Toggle left aside" @click="asideLeftVisible = !asideLeftVisible" />
          <BButton bordered label="Resize left aside" @click="resizeLeftAside" />
        </div>
        <BButton bordered label="Toggle borders" @click="onToggleBorders" />
        <div class="space-x-2">
          <BButton bordered label="Resize right aside" @click="resizeRightAside" />
          <BButton bordered label="Toggle right aside" @click="asideRightVisible = !asideRightVisible" />
        </div>
      </section>
      <BHorizontalLayout
        class="border border-default"
        :borders="borders"
        :aside-left-width="asideLeftWidth"
        :aside-left-visible="asideLeftVisible"
        aside-left-draggable
        :aside-right-width="asideRightWidth"
        :aside-right-visible="asideRightVisible"
        aside-right-draggable
        @aside-left-transition-end="onAsideLeftTransitionEnd"
        @aside-right-transition-end="onAsideRightTransitionEnd"
      >
        <template #aside-left>
          <aside class="h-full p-2 bg-sand-grey-15 text-sand-grey-darker">
            aside-left
          </aside>
        </template>
        <template #main>
          <main class="p-2 h-64 bg-sand-grey-40 text-sand-grey-darker">
            main
          </main>
        </template>
        <template #aside-right>
          <aside class="h-full p-2 bg-sand-grey-15 text-sand-grey-darker">
            aside-right
          </aside>
        </template>
      </BHorizontalLayout>
    </ComponentPageSection>
  </ComponentPage>
</template>
