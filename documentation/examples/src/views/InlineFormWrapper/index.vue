<script setup lang="ts">
import { BFlexbox, BInlineFormWrapper, BTag } from "@firstnoodle-ui/bui";
import { computed, onMounted, ref } from "vue";
import { ComponentPage } from "../../components";
import DateRange from "./DateRange.vue";

const title = ref("");
const startDate = ref<string>();
const endDate = ref<string>();

const inputElement = ref<HTMLInputElement>();
onMounted(() => inputElement.value?.focus());

const confirmDisabled = computed(() => !title.value || !startDate.value || !endDate.value);
</script>

<template>
  <ComponentPage title="InlineFormWrapper">
    <BInlineFormWrapper :confirm-disabled="confirmDisabled">
      <BFlexbox class="px-2 gap-2">
        <input
          ref="inputElement"
          :value="title"
          type="text"
          class="flex-1 text-sm font-bold h-8 focus:outline-none"
          placeholder="Course name"
          @input="(e) => (title = (e.target as HTMLInputElement).value)"
        >
        <BTag v-if="!confirmDisabled" label="↵" />
      </BFlexbox>
      <DateRange
        :start-date="startDate"
        :end-date="endDate"
        @update:start-date="(startDate = $event as string)"
        @update:end-date="(endDate = $event as string)"
      />
    </BInlineFormWrapper>
  </ComponentPage>
</template>
