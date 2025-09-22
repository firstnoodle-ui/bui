<script setup lang="ts">
import { BButton, BVerticalLayout } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const borders = ref(true);
const footerHeight = ref("h-12");
const headerHeight = ref("h-12");

const resizeFooter = () => {
  footerHeight.value = footerHeight.value === "h-12" ? "h-20" : "h-12";
};
const resizeHeader = () => {
  headerHeight.value = headerHeight.value === "h-12" ? "h-20" : "h-12";
};
</script>

<template>
  <ComponentPage>
    <ComponentPageSection title="Basic usage">
      <section class="css-rich-text text-sm mb-4">
        <p>
          A component with a <strong>$main</strong> slot (required) and a header and footer slot (optional): <strong>$header </strong>and
          <strong>$footer</strong>.
        </p>
        <p>The header/footer slots can be resized - try the buttons below.</p>
        <p><br class="ProseMirror-trailingBreak"></p>
        <p>A scrollbar will be applied if the content of <strong>$main</strong> is higher than the frame.</p>
        <p><br class="ProseMirror-trailingBreak"></p>
        <p>This component is used in all modal components and together with HorizontalLayout to create a customizable application layout.</p>
        <p><br class="ProseMirror-trailingBreak"></p>
      </section>
      <section class="space-x-2 mb-4">
        <BButton bordered label="Toggle borders" @click="borders = !borders" />
        <BButton bordered label="Resize header" @click="resizeHeader" />
        <BButton bordered label="Resize footer" @click="resizeFooter" />
      </section>

      <section class="border border-default h-96">
        <BVerticalLayout :borders="borders" :footer-height-class="footerHeight" :header-height-class="headerHeight">
          <template #header>
            <header class="flex items-center justify-between w-full h-full pl-4 pr-2 bg-sand-grey-15 text-secondary text-sm">
              #header
            </header>
          </template>
          <template #main>
            <main class="w-full p-4 bg-sand-grey-40">
              <div
                class="w-full h-64 p-4 bg-sand-grey-40 border-2 border-dashed border-sand-grey rounded-lg text-secondary text-sm"
                style="height: 2000px"
              >
                #main
              </div>
            </main>
          </template>
          <template #footer>
            <footer class="flex items-center h-full px-4 bg-sand-grey-15 text-secondary text-sm">
              #footer
            </footer>
          </template>
        </BVerticalLayout>
      </section>
    </ComponentPageSection>
  </ComponentPage>
</template>
