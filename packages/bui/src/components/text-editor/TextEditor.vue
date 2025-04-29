<script setup lang="ts">
import type { TIcon } from "../types";
import bold from "@tiptap/extension-bold";
import bulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import heading from "@tiptap/extension-heading";
import highlight from "@tiptap/extension-highlight";

import history from "@tiptap/extension-history";

import italic from "@tiptap/extension-italic";

import link from "@tiptap/extension-link";
import listItem from "@tiptap/extension-list-item";

import orderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/vue-3";

import { computed, onBeforeUnmount, ref } from "vue";
import { BFlexbox, BIcon } from "../";
import { useClickOutside } from "../../";
import FormattingButton from "./components/FormattingButton.vue";

import InsertLinkDialog from "./components/InsertLinkDialog.vue";
import InsertTextDialog from "./components/InsertTextDialog.vue";

const props = withDefaults(
  defineProps<{
    autoHideMenu?: boolean;
    embedded?: boolean;
    content: string;
    editorContentClasses?: string;
    editorContentFocusClasses?: string;
    emphasis?: boolean;
    expandVertically?: boolean;
    headerIcon?: TIcon;
    headerLabel?: string;
    heading?: boolean;
    highlight?: boolean;
    history?: boolean;
    insert?: boolean;
    insertIcon?: TIcon;
    insertLabel?: string;
    insertTooltip?: string;
    link?: boolean;
    listStyles?: boolean;
    minimal?: boolean;
    placeholder?: string;
    showMenu?: boolean;
  }>(),
  {
    autoHideMenu: false,
    editorContentClasses: "p-2 bg-1",
    editorContentFocusClasses: "p-2 bg-1",
    embedded: false,
    emphasis: false,
    expandVertically: false,
    heading: false,
    highlight: false,
    history: false,
    insert: false,
    insertIcon: "download",
    insertLabel: "Insert text",
    insertTooltip: "Insert text",
    link: false,
    listStyles: false,
    minimal: false,
    showMenu: undefined,
  },
);

const emit = defineEmits(["blur", "change", "focus"]);

const editorFocussed = ref(false);
const softFocus = ref(false);
const showInsertTextDialog = ref(false);
const showLinkDialog = ref(false);
const editorRef = ref<HTMLDivElement>();

const { disableClickOutside, enableClickOutside } = useClickOutside(() => (softFocus.value = false));

const editor = useEditor({
  content: props.content,
  extensions: [
    bold,
    bulletList,
    heading,
    highlight,
    history,
    italic,
    link,
    listItem,
    orderedList,
    underline,
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: props.placeholder || "",
    }),
  ],
  onCreate: () => {
    if (editorRef.value) {
      enableClickOutside([editorRef.value]);
    }
  },
  onUpdate: ({ editor }) => emit("change", editor.getHTML()),
  onFocus: () => {
    editorFocussed.value = softFocus.value = true;
    emit("focus");
  },
  onBlur: () => {
    editorFocussed.value = false;
    emit("blur");
  },
});

onBeforeUnmount(() => disableClickOutside());

const menuVisible = computed(() => {
  if (props.showMenu !== undefined) return props.showMenu;
  return softFocus.value || !props.autoHideMenu;
});

const headerClass = computed(() => {
  return softFocus.value ? "bg-1 border-b border-default opacity-100" : "bg-2 border-b border-subtle opacity-50";
});

const menuClass = computed(() => {
  return softFocus.value ? "bg-2 border-t border-default opacity-100" : "bg-2 border-t border-subtle opacity-50";
});

const focusPositions = ["start", "end", "all"] as const;
type TFocusPosition = (typeof focusPositions)[number];

const focus = (position: TFocusPosition) => {
  const validatedPosition = focusPositions.includes(position) ? position : "end";
  editor.value?.commands.focus(validatedPosition);
};

const blur = () => {
  editor.value?.commands.blur();
  softFocus.value = false;
};

const onCancelInsertLink = () => (showLinkDialog.value = false);
const onEditorMenuClick = () => (softFocus.value = true);
const onLinkInserted = () => (showLinkDialog.value = false);
const insertContent = (value: string) => editor.value?.commands.insertContent(value);
const onInsertText = (value: string) => {
  insertContent(value);
  showInsertTextDialog.value = false;
};
const onAddLink = () => (showLinkDialog.value = true);
const onAddText = () => (showInsertTextDialog.value = true);

/**
 * For parent component
 */
const closeInsert = () => (showInsertTextDialog.value = false);
const setContent = (value: string) => editor.value?.commands.setContent(value);

defineExpose({ blur, closeInsert, focus, setContent });
</script>

<template>
  <section v-if="editor" ref="editorRef" class="relative w-full">
    <BFlexbox
      col
      align="stretch"
      class="relative rounded-lg font-normal focus-within:border-default"
      :class="{
        'border': !embedded,
        'flex-1 min-h-0': expandVertically,
        'shadow-sm-outline border-action': softFocus,
        'border-transparent': !softFocus && embedded,
        'border-subtle': !softFocus && !embedded,
      }"
    >
      <BFlexbox
        v-if="headerLabel || headerIcon"
        tag="header"
        class="flex-0 h-10 px-3 gap-2 text-sm text-primary rounded-t-lg overflow-hidden"
        :class="headerClass"
      >
        <BIcon v-if="headerIcon" :name="headerIcon" />
        <span v-if="headerLabel">{{ headerLabel }}</span>
      </BFlexbox>
      <BFlexbox tag="main" align="start" fullwidth>
        <EditorContent
          class="flex-1 overflow-y-auto rounded-t-lg focus:outline-hidden"
          :class="{
            [editorContentClasses]: !softFocus,
            [editorContentFocusClasses]: softFocus,
          }"
          :editor="editor"
        />
      </BFlexbox>
      <nav v-if="menuVisible" class="flex-0 min-h-0 p-1 rounded-b-lg overflow-hidden" :class="menuClass">
        <BFlexbox justify="between">
          <BFlexbox class="gap-0.5">
            <template v-if="history">
              <FormattingButton
                icon="undo"
                tooltip="Undo"
                @click="
                  editor!.chain().focus().undo().run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="redo"
                tooltip="Redo"
                @click="
                  editor!.chain().focus().redo().run();
                  onEditorMenuClick();
                "
              />
            </template>
            <template v-if="emphasis">
              <FormattingButton
                icon="bold"
                tooltip="Bold"
                :active="editor.isActive('bold')"
                @click="
                  editor!.chain().focus().toggleBold().run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="italics"
                tooltip="Italic"
                :active="editor.isActive('italic')"
                @click="
                  editor!.chain().focus().toggleItalic().run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="underline"
                tooltip="Underline"
                :active="editor.isActive('underline')"
                @click="
                  editor!.chain().focus().toggleUnderline().run();
                  onEditorMenuClick();
                "
              />
            </template>
            <FormattingButton
              v-if="highlight"
              icon="square-solid"
              tooltip="Yellow highlight"
              :active="editor.isActive('highlight')"
              @click="
                editor!.chain().focus().toggleHighlight().run();
                onEditorMenuClick();
              "
            />
            <FormattingButton
              v-if="heading"
              icon="heading"
              tooltip="Heading"
              :active="editor.isActive('heading', { level: 1 })"
              @click="
                editor!.chain().focus().toggleHeading({ level: 1 }).run();
                onEditorMenuClick();
              "
            />
            <FormattingButton
              v-if="link"
              icon="link"
              tooltip="Add link"
              :active="editor.isActive('link')"
              @click="
                onAddLink();
                onEditorMenuClick();
              "
            />
            <template v-if="listStyles">
              <FormattingButton
                icon="bullet-list"
                tooltip="Bullet list"
                :active="editor.isActive('bulletList')"
                @click="
                  editor!.chain().focus().toggleBulletList().run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="numbered-list"
                tooltip="Numbered list"
                :active="editor.isActive('orderedList')"
                @click="
                  editor!.chain().focus().toggleOrderedList().run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="indent-right"
                tooltip="Indent right"
                :disabled="Boolean(!editor.can().sinkListItem('listItem'))"
                @click="
                  editor!.chain().focus().sinkListItem('listItem').run();
                  onEditorMenuClick();
                "
              />
              <FormattingButton
                icon="indent-left"
                tooltip="Indent left"
                :disabled="Boolean(!editor.can().liftListItem('listItem'))"
                @click="
                  editor!.chain().focus().liftListItem('listItem').run();
                  onEditorMenuClick();
                "
              />
            </template>
            <FormattingButton
              v-if="insert"
              highlight
              :icon="insertIcon"
              :tooltip="insertTooltip"
              :active="editor.isActive('insert')"
              @click="
                onAddText();
                onEditorMenuClick();
              "
            />
          </BFlexbox>
          <div v-if="$slots.menuRight" class="pr-1">
            <slot name="menuRight" />
          </div>
        </BFlexbox>
      </nav>

      <InsertLinkDialog v-if="showLinkDialog" :editor="editor" @inserted="onLinkInserted" @cancel="onCancelInsertLink" />

      <template v-if="showInsertTextDialog">
        <slot v-if="$slots.insert" name="insert" />
        <InsertTextDialog v-else @insert="onInsertText" @cancel="showInsertTextDialog = false" />
      </template>
    </BFlexbox>
  </section>
</template>

<style>
.ProseMirror {
  height: 100%;
}
.ProseMirror:focus {
  outline: none;
}

/* Render blank line */
.ProseMirror p:empty::after {
  content: "\00A0";
}

.ProseMirror a {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
}

/* Unordered (bullet) lists */
.ProseMirror ul {
  margin-left: 30px;
}
.ProseMirror ul li {
  list-style: circle;
  list-style-position: outside;
}
.ProseMirror ul li > p {
  display: inline;
}

/* Ordered (numbered) lists */
.ProseMirror ol {
  margin-left: 30px;
}
.ProseMirror ol li {
  list-style: decimal;
  list-style-position: outside;
}
.ProseMirror ol li > p {
  display: inline;
}

.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>
