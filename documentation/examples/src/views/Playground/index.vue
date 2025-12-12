<script setup lang="ts">
import type { ScrollIntersectionEvent } from "@firstnoodle-ui/bui";
import { BButton, BFormattingButton, BFormattingMenuDivider, BInsertImage, BInsertLink, BScrollbar, BTiptapEditor, useClickOutside } from "@firstnoodle-ui/bui";
import { onBeforeUnmount, onMounted, ref } from "vue";

const content = ref("### Hello");
const editorRef = ref<typeof BTiptapEditor>();

const inputRef = ref<HTMLDivElement>();
const editorFocussed = ref(false);
const focussed = ref(false);
const { disableClickOutside, enableClickOutside, updateClickOutside } = useClickOutside(() => (focussed.value = false));
onMounted(() => enableClickOutside([inputRef.value!]));
onBeforeUnmount(() => disableClickOutside());

const scrollYActive = ref(false);
const onScrollYActive = (active: boolean) => scrollYActive.value = active;
const touchingBottom = ref(false);
const touchingTop = ref(false);
const onIntersect = (e: ScrollIntersectionEvent) => {
  if (e.edge === "top") touchingTop.value = e.hit;
  if (e.edge === "bottom") touchingBottom.value = e.hit;
};
const onChange = (content: string) => console.log(content);
</script>

<template>
  <section class="h-full w-full p-16">
    <main class="max-w-3xl mx-auto">
      <div ref="inputRef" class="border rounded-xl overflow-hidden" :class="{ 'border-default': !focussed, 'border-action shadow-sm': focussed }" @click="focussed = true">
        <header class="flex items-center justify-between border-b p-1" :class="{ 'border-transparent': !scrollYActive, 'border-default': scrollYActive }">
          <nav class="flex items-center gap-0.5">
            <BFormattingButton icon="bold" :active="editorRef?.editor.isActive('bold')" @click="editorRef?.toggleBold" />
            <BFormattingButton icon="italics" :active="editorRef?.editor.isActive('italic')" @click="editorRef?.toggleItalic" />
            <BFormattingButton icon="underline" :active="editorRef?.editor.isActive('underline')" @click="editorRef?.toggleUnderline" />
            <BFormattingButton icon="heading" :active="editorRef?.editor.isActive('heading')" @click="editorRef?.toggleHeading" />
            <BFormattingButton icon="square-solid" :active="editorRef?.editor.isActive('highlight')" @click="editorRef?.toggleHighlight" />
            <BFormattingMenuDivider />
            <BFormattingButton icon="bullet-list" :active="editorRef?.editor.isActive('bulletList')" @click="editorRef?.toggleBulletList" />
            <BFormattingButton icon="numbered-list" :active="editorRef?.editor.isActive('orderedList')" @click="editorRef?.toggleOrderedList" />
            <BFormattingButton icon="indent-left" :disabled="Boolean(!editorRef?.editor.can().liftListItem('listItem'))" @click="editorRef?.indentLeft" />
            <BFormattingButton icon="indent-right" :disabled="Boolean(!editorRef?.editor.can().sinkListItem('listItem'))" @click="editorRef?.indentRight" />
            <BFormattingMenuDivider />
            <BInsertLink v-if="editorRef" :editor="editorRef.editor" @update-targets="updateClickOutside" />
            <BInsertImage v-if="editorRef" :editor="editorRef.editor" />
          </nav>
        </header>
        <main class="">
          <BScrollbar
            show
            disable-x
            class="max-h-96"
            :class="{
              'shadow-[inset_0_-10px_10px_-10px_rgba(0,0,0,0.05)]': scrollYActive && !touchingBottom,
              'shadow-[inset_0_10px_10px_-10px_rgba(0,0,0,0.05)]': scrollYActive && !touchingTop,
            }"
            @scroll-y-active="onScrollYActive"
            @intersect="onIntersect"
          >
            <BTiptapEditor
              ref="editorRef"
              :content="content"
              placeholder="Description"
              class="text-sm px-3 py-2"
              @focus="editorFocussed = true"
              @blur="editorFocussed = false"
              @change="onChange"
            />
          </BScrollbar>
        </main>
        <footer class="flex items-center justify-between border-t p-1" :class="{ 'border-transparent': !scrollYActive, 'border-default': scrollYActive }">
          <section class="flex px-1 items-center gap-2">
            <BButton
              small
              rounded
              icon="agent"
              tooltip="Trigger a response from the agent"
              variant="outlineSubtle"
              class="flex-none"
            />
            <BButton
              small
              rounded
              label="Angry Sussie - ChatGPT 4.5"
              icon-after="chevron-down-small"
              tooltip="Select Agent and Model"
              variant="outlineSubtle"
            />
          </section>
          <section class="flex items-center gap-1">
            <BButton
              rounded
              icon="agent-message"
              :variant="focussed ? 'text' : 'textSubtle'"
            />
            <BButton
              :variant="focussed ? 'fill' : 'outlineSubtle'"
              rounded icon="arrow-up"
            />
          </section>
        </footer>
      </div>
      <footer style="font-size: 11px" class="h-6 pl-4 flex items-center text-red-500">
        <span>Please give your question a title</span>
      </footer>
    </main>
  </section>
</template>
