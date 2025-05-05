<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<script setup lang="ts">
import type { TPopSelectOption } from "@firstnoodle-ui/bui";
import { BButton, BConfirmCancel, BDataPoint, BDialog, BPopSelect, BPopSelectFooterButton } from "@firstnoodle-ui/bui";
import { computed, nextTick, ref } from "vue";

type TValueOption = {
  value: string | null;
} & TPopSelectOption;

type IError = {
  message: string;
  error: {
    config: unknown;
    request: unknown;
    response: {
      config: unknown;
      data: unknown;
      headers: unknown;
      request: unknown;
      status: number;
      statusText: string;
    };
  };
};

const error = ref<IError | null>(null);
const errorDetails = ref<IError | null>(null);
const errorMessage = ref<string | undefined>();
const errorObject: IError = {
  message: "Request failed with status code 500",
  error: {
    config: {},
    request: {},
    response: {
      config: {},
      data: {},
      headers: {},
      request: {},
      status: 500,
      statusText: "Internal Server Error",
    },
  },
};

const initialLoadCompleted = ref(false);
const loadingOptions = ref(false);
const options = ref<TValueOption[]>([]);
const currentQuery = ref("");
const saving = ref(false);
const value = ref<string | null>(null);

const buttonRef = ref<typeof BButton>();
const popSelectRef = ref<typeof BPopSelect & { close: () => void }>();

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

const showFooter = computed(() => {
  return !!currentQuery.value.length && !options.value.length && initialLoadCompleted.value;
});

const closePopper = () => popSelectRef.value!.close();

const reset = () => {
  currentQuery.value = "";
  options.value = [];
  initialLoadCompleted.value = false;
};

const onCancel = () => {
  closePopper();
  reset();
};

const onClearSelection = () => {
  // eslint-disable-next-line no-console
  console.log("clearSelection");
  // closePopper()
  // onSave({ value: null } as TValueOption)
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
      icon: "document",
      meta: "test",
    }));

  loadingOptions.value = false;
  initialLoadCompleted.value = true;
};

const onSave = async (option: TValueOption) => {
  // Use this to revert in case of error while saving
  const cachedValue = value.value;

  value.value = option.value;
  saving.value = true;

  if (option.value) {
    await nextTick();
    buttonRef.value!.focus();
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  saving.value = false;
  value.value = cachedValue;
  error.value = errorObject;
  errorMessage.value = "There was an error saving the data. Click to view details.";
  reset();
};

const onSaveCustom = () => {
  closePopper();
  onSave({ value: currentQuery.value } as TValueOption);
  reset();
};

const onShowErrorDetails = () => {
  // popSelectRef.value!.close()
  errorDetails.value = error.value;
  error.value = null;
  errorMessage.value = undefined;
};
</script>

<template>
  <section>
    <div class="mb-4">
      This example is based on the same setup as the two previous, but here there is an error when saving the selected value.
    </div>
    <BPopSelect
      placeholder="Search"
      loading-text="Fetching"
      reset-on-close
      popper-width-class="w-64"
      :disabled="saving"
      :remote-method="onQuery"
      :loading="loadingOptions"
      :options="options"
      @select="onSave"
      @close="reset"
      @save-custom="onSaveCustom"
    >
      <template #trigger="{ visible }">
        <BDataPoint
          ref="buttonRef"
          clearable
          name="Number"
          :error="errorMessage"
          :value="value"
          :saving="saving"
          :soft-focus="visible"
          @clear="onClearSelection"
          @show-error="onShowErrorDetails"
        />
      </template>

      <!-- <BPopSelectFooterButton v-if="value" slot="footer" icon="close" label="Clear value" @click="onClearSelection" /> -->
      <BPopSelectFooterButton v-if="value" icon="close" label="Clear value" @click="onClearSelection" />

      <!-- <footer v-if="showFooter" slot="footer" class="p-3 space-y-2"> -->
      <footer v-if="showFooter" class="p-3 space-y-2">
        <div class="text-sm text-primary">
          Save custom value, <strong>{{ currentQuery }}</strong>?
        </div>
        <BConfirmCancel confirm-label="Save" confirm-icon="check" @confirm="onSaveCustom" @cancel="onCancel" />
      </footer>
    </BPopSelect>

    <BDialog v-if="errorDetails" @close="errorDetails = null">
      <template #title>
        Error details
      </template>
      <template #main>
        {{ errorDetails.message }}
      </template>
      <template #footer>
        <BButton variant="fill" label="Close" @click="errorDetails = null" />
      </template>
    </BDialog>
  </section>
</template>
