<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";
import { BConfirmCancel, BInput } from "../../";
import TextEditorDialog from "./Dialog.vue";

const props = defineProps<{ editor: any }>();
const emit = defineEmits(["cancel", "inserted"]);
const linkAddress = ref<string | null>(null);
const linkDisplayName = ref<string | null>(null);

const inputRef = ref<typeof BInput>();

const onAddLink = () => {
  // get the current link if any
  linkAddress.value = props.editor.getAttributes("link").href;

  const { view, state } = props.editor;

  if (linkAddress.value) {
    /**
     * If there is a link address, there must be a display name.
     * But there is no simple way to get the display name.
     * This is solved by looking at the parent content of the cursor position
     * and find the content where the link is added
     *
     * The parent content is the line where cursor is broken down into blocks
     */
    const relevantTextNodes = view.state.selection.ranges[0].$from.parent.content.content.filter(
      (c: any) => c.marks.length > 0 && c.marks[0].attrs.href === linkAddress.value,
    );

    linkDisplayName.value = relevantTextNodes[0].text;
  }
  else {
    // get the selected text as the display name
    const { from, to } = view.state.selection;
    linkDisplayName.value = state.doc.textBetween(from, to, "");
  }
};

onBeforeMount(() => onAddLink());
onMounted(() => inputRef.value!.focus());

// TODO use define model
const onAddressChange = (value: string) => (linkAddress.value = value);
const onDisplayNameChange = (value: string) => (linkDisplayName.value = value);

const onInsert = () => {
  if (linkAddress.value && !linkAddress.value.includes("http")) {
    linkAddress.value = `https://${linkAddress.value}`;
  }

  if (linkAddress.value) {
    props.editor.chain().focus().extendMarkRange("link").setLink({ href: linkAddress.value }).run();

    const transaction = props.editor.state.tr.insertText(linkDisplayName.value);
    props.editor.view.dispatch(transaction);

    emit("inserted");
  }
};
</script>

<template>
  <TextEditorDialog>
    <header>Insert link</header>
    <section class="space-y-1">
      <div class="text-xs text-secondary">
        Text to display
      </div>
      <BInput ref="inputRef" placeholder="Text to display" :value="linkDisplayName || ''" @change="onDisplayNameChange" />
    </section>
    <section class="space-y-1">
      <div class="text-xs text-secondary">
        Address
      </div>
      <BInput placeholder="Link to a web page" :value="linkAddress || ''" @change="onAddressChange" />
    </section>
    <BConfirmCancel confirm-label="Insert" @confirm="onInsert" @cancel="emit('cancel')" />
  </TextEditorDialog>
</template>
