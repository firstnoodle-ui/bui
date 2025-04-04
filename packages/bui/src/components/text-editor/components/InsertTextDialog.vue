<script setup lang="ts">
import { onMounted, ref } from "vue";
import { BConfirmCancel, BInput } from "../../";
import TextEditorDialog from "./Dialog.vue";

const emit = defineEmits(["cancel", "insert"]);
const textToBeInserted = ref<string | null>(null);
const inputRef = ref<typeof BInput>();

onMounted(() => inputRef.value!.focus());

const onCancelInsert = () => {
  emit("cancel");
  textToBeInserted.value = null;
};

// TODO use defineModel
const onInputChange = (value: string) => (textToBeInserted.value = value);

const onInsert = () => {
  emit("insert", textToBeInserted.value);
  textToBeInserted.value = null;
};
</script>

<template>
  <TextEditorDialog>
    <header>Insert text</header>
    <section class="space-y-1">
      <BInput ref="inputRef" placeholder="Text to be inserted" :value="textToBeInserted || ''" @change="onInputChange" />
    </section>
    <div class="flex flex-1 justify-end">
      <BConfirmCancel confirm-label="Insert" @confirm="onInsert" @cancel="onCancelInsert" />
    </div>
  </TextEditorDialog>
</template>
