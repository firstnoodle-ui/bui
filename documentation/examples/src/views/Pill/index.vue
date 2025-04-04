<script setup lang="ts">
import type { TLogicOperator } from "@firstnoodle-ui/bui";
import { BButton, BConfirmCancel, BPill, BPopper } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

// import BNumberSelect from "@/components/NumberSelect/index.vue";
// import BPopperContent from "@/components/Popper/PopperContent.vue";

const selectedOperator = ref<TLogicOperator>("=");

const count = ref(1);
const onCountChange = (value: number) => (count.value = value);
// eslint-disable-next-line no-console
const onDelete = () => console.log("delete");
</script>

<template>
  <ComponentPage title="Pill">
    <ComponentPageSection title="Default">
      <BPopper trigger="click">
        <template #default="slotProps">
          <BPill :deletable="true" :selected="slotProps && slotProps.visible" @delete="onDelete">
            <span>Role count </span>
            <span class="font-bold">= 3</span>
          </BPill>
        </template>
        <template #content>
          <b-popper-content class="p-4">
            <section class="inline-flex w-40 flex-col space-y-4">
              <section class="inline-flex flex-col space-y-1">
                <h6 class="text-xs text-secondary">
                  Logic operator
                </h6>
                <b-button-group fullwidth>
                  <BButton fullwidth bordered type="primary" label="=" :solid="selectedOperator === '='" @click="selectedOperator = '='" />
                  <BButton fullwidth bordered type="primary" label="!=" :solid="selectedOperator === '!='" @click="selectedOperator = '!='" />
                  <BButton fullwidth bordered type="primary" label="<=" :solid="selectedOperator === '<='" @click="selectedOperator = '<='" />
                  <BButton fullwidth bordered type="primary" label=">=" :solid="selectedOperator === '>='" @click="selectedOperator = '>='" />
                </b-button-group>
              </section>
              <section class="inline-flex flex-col space-y-1">
                <h6 class="text-xs text-secondary">
                  Count
                </h6>
                <b-number-select :value="count" :min="1" :max="10" @change="onCountChange" />
              </section>
              <BConfirmCancel
                fill-container
                alignment="right"
                confirm-icon="check"
                confirm-label="Apply"
                cancel-label="Clear"
                cancel-icon="close"
                cancel-button-is-text
              />
            </section>
          </b-popper-content>
        </template>
      </BPopper>
    </ComponentPageSection>
  </ComponentPage>
</template>
