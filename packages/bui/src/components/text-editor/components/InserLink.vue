<script setup lang="ts">
import type { Mark } from "prosemirror-model";
import { computed, ref } from "vue";
import { BConfirmCancel } from "../../confirm-cancel";
import { BInput } from "../../input";
import { BPopper, BPopperContent } from "../../popper";
import { getCurrentWord, replaceCurrentWord } from "../utils.ts";
import FormattingButton from "./FormattingButton.vue";

const props = defineProps<{ editor: any }>();
const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "inserted"): void;
  (e: "updateTargets", elements: HTMLElement[]): void;
}>();

const popperRef = ref<typeof BPopper>();

const displayNameRef = ref<typeof BInput>();
const displayName = ref("");
const onDisplayNameChange = (value: string) => (displayName.value = value);
const onDisplayNameEnter = () => {
  if (inputsAreValid.value) onInsertLink();
  else linkAddressRef.value?.focus();
};

const linkAddress = ref("");
const linkAddressRef = ref<typeof BInput>();
const onLinkAddressChange = (value: string) => (linkAddress.value = value);
const onLinkAddressEnter = () => {
  if (inputsAreValid.value) onInsertLink();
};

const inputsAreValid = computed(() => {
  if (!linkAddress.value || !displayName.value) return false;
  return linkAddress.value?.trim().length > 0 && displayName.value?.trim().length > 0;
});

const wordFromCursor = ref(false);

const onOpen = ([_trigger, popper]: [HTMLElement, HTMLElement]) => {

  const { state, view } = props.editor;
  const { empty, from } = state.selection;

  const $pos = state.doc.resolve(from);
  const link = $pos.marks().find((mark: Mark) => mark.type.name === "link");
  if (link) {
    linkAddress.value = link.attrs.href;
  }
  else if (!empty) {
    const { from, to } = view.state.selection;
    displayName.value = state.doc.textBetween(from, to, "");
  }
  else {
    displayName.value = getCurrentWord(props.editor) || "";
    wordFromCursor.value = true;
  }

  if (displayName.value.trim().length) {
    linkAddressRef.value?.focus();
  }
  else {
    displayNameRef.value?.focus();
  }

  // make sure clickoutside is updated on parent popper
  emit("updateTargets", [popper]);
};

// update parents popper targets for clickOutside
const onClose = () => emit("updateTargets", []);

const reset = () => {
  linkAddress.value = "";
  displayName.value = "";
};

const onInsertLink = () => {
  if (linkAddress.value && !linkAddress.value.includes("http")) {
    linkAddress.value = `https://${linkAddress.value}`;
  }

  if (linkAddress.value) {

    props.editor.chain().focus().extendMarkRange("link").setLink({ href: linkAddress.value }).run();
    if (wordFromCursor.value) {
      replaceCurrentWord(props.editor, displayName.value);
    }
    else {
      const transaction = props.editor.state.tr.insertText(displayName.value);
      props.editor.view.dispatch(transaction);
    }
    emit("inserted");
  }
  popperRef.value?.close();
  reset();
};
</script>

<template>
  <BPopper ref="popperRef" placement="top" trigger="click" @open="onOpen" @close="onClose">
    <template #default="{ visible }">
      <FormattingButton icon="link" :active="visible" />
    </template>
    <template #content="{ close }">
      <BPopperContent class="p-4 flex flex-col gap-4">
        <p class="text-sm">
          Insert link
        </p>
        <section class="space-y-1">
          <div style="font-size: 11px;" class="text-secondary font-medium">
            Text to display
          </div>
          <BInput
            ref="displayNameRef"
            placeholder="Text to display"
            :value="displayName"
            @change="onDisplayNameChange"
            @enter="onDisplayNameEnter"
          />
        </section>
        <section class="space-y-1">
          <div style="font-size: 11px;" class="text-secondary font-medium">
            Address
          </div>
          <BInput
            ref="linkAddressRef"
            placeholder="Link to a web page"
            :value="linkAddress || ''"
            @change="onLinkAddressChange"
            @enter="onLinkAddressEnter"
          />
        </section>
        <BConfirmCancel
          fill-container
          order="confirm-last"
          confirm-label="Insert"
          :confirm-disabled="!inputsAreValid"
          @confirm="onInsertLink"
          @cancel="reset();close()"
        />
      </BPopperContent>
    </template>
  </BPopper>
</template>
