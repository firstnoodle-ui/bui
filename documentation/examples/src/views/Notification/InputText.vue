<script setup lang="ts">
import { BNotification, BPopper } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import { notificationsEventBus } from "./notifications-event-bus";

const { maxLength, id, defaultValue } = defineProps<{ id: string; maxLength: number; defaultValue: string }>();

const showPopper = ref<boolean>(false);
const value = ref<string>(defaultValue);

const onInput = (event: Event) => {
  if (event.target) {
    value.value = (event.target as HTMLInputElement).value;
  }
};

notificationsEventBus.on("validate", (idsToValidate) => {
  if (idsToValidate.length > 0 && !idsToValidate.includes(id)) return;

  if (value.value.length < maxLength) {
    showPopper.value = true;
  }
  else {
    showPopper.value = false;
  }
});
</script>

<template>
  <BPopper trigger="manual" :show="showPopper" placement="right" :offset-main="10">
    <input :value="value" class="flex-1 text-sm leading-tight bg-secondary p-2 rounded-sm focus:outline-hidden" @input.stop.prevent="onInput">

    <template #content>
      <BNotification
        type="error"
        icon="error"
        :text="`Error: Input is shorter than the required length of ${maxLength} characters.`"
        @close="showPopper = false"
      />
    </template>
  </BPopper>
</template>
