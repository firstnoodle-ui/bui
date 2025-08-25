<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useClickOutside } from "../../composables";
import { BButton } from "../button";
import { BFlexbox } from "../flexbox";

defineProps<{ value: string; indentation: number; saving: boolean }>();

const emit = defineEmits(["cancel", "change", "save"]);

const inputRef = ref<HTMLInputElement>();
const container = ref<typeof BFlexbox>();
const { disableClickOutside, enableClickOutside } = useClickOutside(() => emit("cancel"));
onMounted(() => {
  enableClickOutside([container.value!.$el]);
  inputRef.value?.focus();
});
onBeforeUnmount(() => disableClickOutside());

const onInput = (event: Event) => {
  if (event.target) {
    emit("change", (event.target as HTMLInputElement).value);
  }
};
const onEnter = (e: KeyboardEvent) => {
  e.stopPropagation();
  e.preventDefault();
  emit("save");
};
const onBlur = (event: Event) => {
  event.stopImmediatePropagation();
  event.stopPropagation();
  event.preventDefault();
  emit("cancel");
};
</script>

<template>
  <BFlexbox
    ref="container"
    class="h-8 gap-1 pr-1"
    :style="{ paddingLeft: `${indentation}px` }"
  >
    <div class="w-4 h-4" />
    <section class="flex items-center w-full h-6 pl-2 px-1 border border-default rounded-sm">
      <input
        ref="inputRef"
        type="text"
        :value="value"
        placeholder="Enter name"
        class="flex-1 min-w-0 text-xs leading-tight bg-transparent focus:outline-hidden"
        @change.stop.prevent
        @keydown.esc.stop.prevent="onBlur"
        @keydown.enter.stop.prevent="onEnter"
        @keyup.enter.stop.prevent
        @input.stop.prevent="onInput"
      >
    </section>
    <aside class="flex items-center gap-1">
      <BButton
        small
        icon="check"
        variant="outlineSubtle"
        :loading="saving"
        @click="emit('save')"
      />
      <BButton
        small
        icon="close"
        variant="outlineSubtle"
        @click="emit('cancel')"
      />
    </aside>
  </BFlexbox>
</template>
