<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { TPopSelectOption, TPopSelectResultFilter } from "@firstnoodle-ui/bui";
import { BConfirmCancel, BDataPoint, BPopSelect, BPopSelectFooterButton } from "@firstnoodle-ui/bui";
import { computed, nextTick, ref } from "vue";

type TValueOption = TPopSelectOption & {
  value: string | null;
};

const dummyOptions = [
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

const resultFilters: TPopSelectResultFilter<TValueOption>[] = [
  {
    name: "All",
    disabled: false,
    execute: (_option: TValueOption) => true,
    count: -1,
  },
  {
    name: "Odd",
    disabled: false,
    execute: (option: TValueOption) => option.meta === "Odd",
    count: -1,
  },
  {
    name: "Even",
    disabled: false,
    execute: (option: TValueOption) => option.meta === "Even",
    count: -1,
  },
];

const initialLoadCompleted = ref(false);
const loadingOptions = ref(false);
const options = ref<TValueOption[]>(
  dummyOptions.map(o => ({
    label: o,
    value: o,
    disabled: o === "ten",
    meta: dummyOptions.indexOf(o) % 2 ? "Even" : "Odd",
  })),
);

const currentQuery = ref("");
const saving = ref(false);
const value = ref<string | null>(null);

const buttonRef = ref<typeof BDataPoint>();
const popSelectRef = ref<typeof BPopSelect>();

const showFooter = computed(() => !!currentQuery.value.length && !options.value.length && initialLoadCompleted.value);

// @ts-expect-error unknown prop
const closePopper = () => popSelectRef.value!.close();

const onSave = async (option: TValueOption) => {
  // cahce value (below) to revert in case of error while saving
  // const cachedValue = value.value
  value.value = option.value;
  saving.value = true;

  if (option.value) {
    await nextTick();
    buttonRef.value!.focus();
  }

  await new Promise(resolve => setTimeout(resolve, 1500));
  saving.value = false;
};

const onClearSelection = () => {
  onSave({ value: null } as TValueOption);
  closePopper();
};

const onSaveCustom = () => {
  onSave({ value: currentQuery.value } as TValueOption);
  closePopper();
};

const onQuery = async (query: string) => {
  if (!query.length) {
    initialLoadCompleted.value = false;
    options.value = [];
    return;
  }

  if (query.length > currentQuery.value.length && initialLoadCompleted.value && !options.value.length) {
    currentQuery.value = query;
    return;
  }

  currentQuery.value = query;
  loadingOptions.value = true;

  await new Promise(resolve => setTimeout(resolve, 1000));

  options.value = dummyOptions
    .filter(o => o.includes(query))
    .map(o => ({
      label: o,
      value: o,
      disabled: o === "ten",
      meta: dummyOptions.indexOf(o) % 2 ? "Even" : "Odd",
    }));

  loadingOptions.value = false;
  initialLoadCompleted.value = true;
};

const onShowError = () => {
  console.log("show error");
};

const reset = () => {
  currentQuery.value = "";
  options.value = dummyOptions.map(o => ({
    label: o,
    value: o,
    disabled: o === "ten",
    meta: dummyOptions.indexOf(o) % 2 ? "Even" : "Odd",
  }));
  initialLoadCompleted.value = false;
};
</script>

<template>
  <section>
    <div class="mb-4">
      This example uses the <strong>&lt;b-data-point/&gt;</strong> component. <br><br>
      Here we are calling an mock API endpoint, querying some data. We have also implemented that if the query has no match, a footer will appear in the popper to suggest to save the new value.
    </div>
    <BPopSelect
      ref="popSelectRef"
      placeholder="Search"
      loading-text="Fetching"
      popper-width-class="w-64"
      reset-on-close
      fixed-height
      :disabled="saving"
      :remote-method="onQuery"
      :loading="loadingOptions"
      :options="options"
      :result-filters="resultFilters"
      @select="onSave"
      @close="reset"
      @save-custom="onSaveCustom"
    >
      <template #trigger="{ visible }">
        <BDataPoint
          ref="buttonRef"
          clearable
          name="Number"
          :value="value"
          :saving="saving"
          :soft-focus="visible"
          @clear="onClearSelection"
          @show-error="onShowError"
        />
      </template>

      <template #footer>
        <BPopSelectFooterButton
          v-if="value"

          icon="close"
          label="Clear value"
          @click="onClearSelection"
        />
      </template>

      <!-- <template v-if="showFooter" #footer> -->
      <template v-if="showFooter">
        <footer class="p-3 space-y-2">
          <div class="text-sm text-primary">
            Save custom value, <strong>{{ currentQuery }}</strong>?
          </div>
          <BConfirmCancel
            confirm-label="Save"
            confirm-icon="check"
            @confirm="onSaveCustom"
            @cancel="closePopper"
          />
        </footer>
      </template>
    </BPopSelect>
  </section>
</template>
