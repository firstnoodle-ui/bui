<script setup lang="ts">
import bold from "@tiptap/extension-bold";
import bulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import HardBreak from "@tiptap/extension-hard-break";
import heading from "@tiptap/extension-heading";
import highlight from "@tiptap/extension-highlight";
import history from "@tiptap/extension-history";
import image from "@tiptap/extension-image";
import italic from "@tiptap/extension-italic";
import link from "@tiptap/extension-link";
import listItem from "@tiptap/extension-list-item";
import orderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import underline from "@tiptap/extension-underline";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/vue-3";
import { ref, watch } from "vue";
import { enterKeyBehaviour, PasteImage, useExtensionStorage } from "../../utils/tiptap";

const { content, placeholder = "Write text..", shiftEnterCreatesNewLine = true } = defineProps<{
  content: string;
  placeholder?: string;
  shiftEnterCreatesNewLine?: boolean;
}>();

const emit = defineEmits<{
  (e: "blur"): void;
  (e: "change", value: string): void;
  (e: "editor-ready"): void;
  (e: "new-line-state-changed", state: boolean): void;
  (e: "focus"): void;
  (e: "enter-key"): void;
}>();

const editorFocussed = ref(false);

const editor = useEditor({
  content,
  extensions: [
    HardBreak.configure({
      keepMarks: false,
    }),
    enterKeyBehaviour.configure({
      onEnter: () => emit("enter-key"),
      modEnterOnly: !shiftEnterCreatesNewLine,
    }),
    bold,
    bulletList,
    heading.configure({
      levels: [1, 2, 3],
    }),
    highlight,
    history,
    image,
    italic,
    link,
    listItem,
    orderedList,
    underline,
    Document,
    Paragraph,
    PasteImage,
    Text,
    Markdown,
    Placeholder.configure({ placeholder }),
  ],
  onCreate: () => emit("editor-ready"),
  onUpdate: ({ editor }) => emit("change", editor.getMarkdown()),
  onFocus: () => {
    editorFocussed.value = true;
    emit("focus");
  },
  onBlur: () => {
    editorFocussed.value = false;
    emit("blur");
  },
  contentType: "markdown",
});

const hasUsedNewline = useExtensionStorage<boolean>(
  editor,
  enterKeyBehaviour.name,
  "hasUsedNewline",
);

watch(hasUsedNewline, (newVal) => {
  emit("new-line-state-changed", newVal || false);
});

const focusPositions = ["start", "end", "all"] as const;
type FocusPosition = (typeof focusPositions)[number];

const focus = (position: FocusPosition) => {
  const validatedPosition = focusPositions.includes(position) ? position : "end";
  editor.value?.commands.focus(validatedPosition);
};

defineExpose({
  editor,
  blur: editor.value?.commands.blur(),
  focus,
  insertContent: (value: string) => editor.value?.commands.insertContent(value),
  setContent: (value: string) => editor.value?.commands.setContent(value),
  indentLeft: () => editor.value!.chain().focus().liftListItem("listItem").run(),
  indentRight: () => editor.value!.chain().focus().sinkListItem("listItem").run(),
  redo: () => editor.value!.chain().focus().redo().run(),
  reset: () => {
    editor.value!.commands.clearContent();
    (editor.value!.commands as any).setHasUsedNewline(false);
  },
  toggleBold: () => editor.value!.chain().focus().toggleBold().run(),
  toggleBulletList: () => editor.value!.chain().focus().toggleBulletList().run(),
  toggleItalic: () => editor.value!.chain().focus().toggleItalic().run(),
  toggleHighlight: () => editor.value!.chain().focus().toggleHighlight().run(),
  toggleHeading: () => editor.value!.chain().focus().toggleHeading({ level: 1 }).run(),
  toggleHeading2: () => editor.value!.chain().focus().toggleHeading({ level: 2 }).run(),
  toggleOrderedList: () => editor.value!.chain().focus().toggleOrderedList().run(),
  toggleUnderline: () => editor.value!.chain().focus().toggleUnderline().run(),
  undo: () => editor.value!.chain().focus().undo().run(),
});
</script>

<template>
  <EditorContent
    v-if="editor"
    class="flex-1 focus:outline-hidden"
    :editor="editor"
  />
</template>
