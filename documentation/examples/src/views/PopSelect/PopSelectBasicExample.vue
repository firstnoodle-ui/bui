<script setup lang="ts">
import type { TPopSelectOption } from "@firstnoodle-ui/bui";
import { BButton, BFlexbox, BPopSelect, BSwitch } from "@firstnoodle-ui/bui";
import { onBeforeMount, ref } from "vue";

const buttonRef = ref<typeof BButton>();
const sameWidthRef = ref<HTMLElement>();
const options = ref<TPopSelectOption[]>([]);
const selectedOption = ref<TPopSelectOption>();
const disabled = ref(false);
const filterable = ref(false);
const fixedHeight = ref(false);
const keepOpen = ref(false);
const showFooter = ref(false);
const sameWidthAsTrigger = ref(false);
const sameWidthAsReference = ref(false);

onBeforeMount(() => {
  const list = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty",
  ];
  options.value = list.map(o => ({ label: o, value: o, disabled: o === "ten" }));
});

const onSelect = (option: TPopSelectOption) => {
  // eslint-disable-next-line no-console
  console.log("select", option);
  // buttonRef.value!.focus()
  selectedOption.value = option;
};

const onToggleSameWidthAsReference = () => {
  if (sameWidthAsTrigger.value) sameWidthAsTrigger.value = false;
  sameWidthAsReference.value = !sameWidthAsReference.value;
};
const onToggleSameWidthAsTrigger = () => {
  if (sameWidthAsReference.value) sameWidthAsReference.value = false;
  sameWidthAsTrigger.value = !sameWidthAsTrigger.value;
};
</script>

<template>
  <section>
    <div class="mb-4">
      Use together with a button as a simple dropdown + demo of <strong>same-width-as-reference</strong> prop, which sets the width of the popper to
      match the width of the trigger.
    </div>
    <div class="mb-4">
      <div ref="sameWidthRef" class="w-1/2 p-2 border-2 border-dotted border-gray-200 bg-gray-100 text-gray-400 rounded">
        Reference element
      </div>
    </div>
    <BFlexbox col align="start" class="space-y-4">
      <BPopSelect
        :options="options"
        :disabled="disabled"
        :selected="selectedOption"
        :fixed-height="fixedHeight"
        :keep-open="keepOpen"
        :same-width-as-trigger="sameWidthAsTrigger"
        :same-width-as-element="sameWidthAsReference ? sameWidthRef : undefined"
        :filterable="filterable"
        @select="onSelect"
      >
        <template #trigger="{ disabled: triggerDisabled, visible }">
          <BButton
            ref="buttonRef"
            bordered
            icon="numbered-list"
            label="Select a number"
            tooltip="Click and select"
            :disabled="triggerDisabled"
            :icon-after="visible ? 'chevron-up' : 'chevron-down'"
            :soft-focus="visible"
          />
        </template>
        <template v-if="showFooter" #footer>
          <footer class="p-3 space-y-2">
            <div class="text-sm text-primary">
              Current selection: <span class="font-bold">{{ selectedOption ? selectedOption.label : "none" }}</span>
            </div>
          </footer>
        </template>
      </BPopSelect>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="disabled" @toggle="disabled = !disabled" />
        <div class="leading-none">
          Disabled
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="filterable" @toggle="filterable = !filterable" />
        <div class="leading-none">
          Filterable
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="fixedHeight" @toggle="fixedHeight = !fixedHeight" />
        <div class="leading-none">
          Fixed height <span class="italic text-tertiary">(use with filterable on and search for "ne")</span>
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="sameWidthAsTrigger" @toggle="onToggleSameWidthAsTrigger" />
        <div class="leading-none">
          Same width as trigger
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="sameWidthAsReference" @toggle="onToggleSameWidthAsReference" />
        <div class="leading-none">
          Same width as reference element <span class="italic text-tertiary">(in this example the reference element above)</span>
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="keepOpen" @toggle="keepOpen = !keepOpen" />
        <div class="leading-none">
          Keep open
        </div>
      </BFlexbox>
      <BFlexbox class="space-x-2">
        <BSwitch small :value="showFooter" @toggle="showFooter = !showFooter" />
        <div class="leading-none">
          Show footer
        </div>
      </BFlexbox>
    </BFlexbox>
  </section>
</template>
