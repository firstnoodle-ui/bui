<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue';
import { BConfirmCancel, buttonVariants, icons, type ButtonVariant, type TIcon } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlString from "../../components/PropControlString.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";

const onCancel = () => console.log("cancel");
const onConfirm = () => console.log("confirm");

const alignments = ['left', 'right'];
const selectedAlignment = ref(alignments[0]);

const variantOptions:string[] = ['fill', 'outline', 'outlineSubtle', 'text', 'textSubtle', 'destructive'];

const cancelButtonVariant = ref(variantOptions[1]);
const cancelButtonDisabled = ref(false);
const cancelIcon = ref<string|undefined>();
const cancelLabel = ref('Cancel');

const confirmButtonVariant = ref(variantOptions[0]);
const confirmButtonDisabled = ref(false);
const confirmIcon = ref<string|undefined>();
const confirmLabel = ref('Confirm');

const fillContainer = ref(false);
const loading = ref(false);
const small = ref(false);
</script>

<template>
  <ComponentPage title="ConfirmCancel">
    <ComponentPageSection title="ConfirmCancel">
      <div class="w-1/3">
        <BConfirmCancel
          :small="small"
          :cancel-variant="(cancelButtonVariant as ButtonVariant)"
          :confirm-variant="(confirmButtonVariant as ButtonVariant)"
          :confirm-icon="(confirmIcon as TIcon)"
          :cancel-icon="(cancelIcon as TIcon)"
          :confirm-label="confirmLabel"
          :cancel-label="cancelLabel"
          :confirm-disabled="confirmButtonDisabled"
          :cancel-disabled="cancelButtonDisabled"
          :fillContainer="fillContainer"
          :loading="loading"
          :alignment="(selectedAlignment as any)"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </div>
      <template #controls>
        <PropControlBoolean name="Cancel disabled" :value="cancelButtonDisabled" @toggle="cancelButtonDisabled = !cancelButtonDisabled" />
        <PropControlBoolean name="Confirm disabled" :value="confirmButtonDisabled" @toggle="confirmButtonDisabled = !confirmButtonDisabled" />
        <PropControlBoolean name="Fill container" :value="fillContainer" @toggle="fillContainer = !fillContainer"/>
        <PropControlBoolean name="Loading" :value="loading" @toggle="loading = !loading"/>
        <PropControlBoolean name="Small" :value="small" @toggle="small = !small"/>
        <PropControlString name="Confirm label" :value="confirmLabel" @change="(value:string) => confirmLabel = value" />
        <PropControlString name="Cancel label" :value="cancelLabel" @change="(value:string) => cancelLabel = value" />
        <PropControlSelect name="Alignment" :value="selectedAlignment" :options="[...alignments]" @select="(option:string) => selectedAlignment = option" />
        <PropControlSelect name="Confirm variant" :value="confirmButtonVariant" :options="[...buttonVariants]" @select="(option:string) => confirmButtonVariant = option" />
        <PropControlSelect name="Cancel variant" :value="cancelButtonVariant" :options="[...buttonVariants]" @select="(option:string) => cancelButtonVariant = option" />
        <PropControlSelect name="Confirm icon" :value="confirmIcon" :options="[...icons]" @select="(option:string) => confirmIcon = option" />
        <PropControlSelect name="Cancel icon" :value="cancelIcon" :options="[...icons]" @select="(option:string) => cancelIcon = option" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>