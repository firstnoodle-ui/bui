<script setup lang="ts">
import { ref } from "vue";
import FormattingButton from "./FormattingButton.vue";

const { editor } = defineProps<{ editor: any }>();

const fileInputRef = ref<HTMLInputElement>();

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  console.log(event);
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    editor.chain().focus().setImage({ src: reader.result as string }).run();
  };

  reader.readAsDataURL(file);
};

const onOpenFilebrowser = () => {
  fileInputRef.value?.click();
};
</script>

<template>
  <FormattingButton
    icon="photo"
    @click="onOpenFilebrowser"
  />
  <input
    ref="fileInputRef"
    type="file"
    accept="image/*"
    style="display: none"
    @change="handleFileSelect"
  >
</template>
