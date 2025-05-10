<script setup lang="ts">
import type { ButtonVariant, TIcon } from "@firstnoodle-ui/bui";
import { BConfirmCancel, buttonVariants, icons } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import EventFlasher from "../../components/EventFlasher.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";
import PropControlString from "../../components/PropControlString.vue";

const confirmRef = ref<typeof EventFlasher>();
const cancelRef = ref<typeof EventFlasher>();

const orderOptions = ["confirm-first", "confirm-last"];
const selectedOrder = ref(orderOptions[0]);
const vertical = ref(false);

const variantOptions: string[] = ["fill", "outline", "outlineSubtle", "text", "textSubtle", "destructive"];

const cancelButtonVariant = ref(variantOptions[1]);
const cancelButtonDisabled = ref(false);
const cancelIcon = ref<string | undefined>();
const cancelLabel = ref("Cancel");

const confirmButtonVariant = ref(variantOptions[0]);
const confirmButtonDisabled = ref(false);
const confirmIcon = ref<string | undefined>();
const confirmLabel = ref("Confirm");

const fillContainer = ref(false);
const loading = ref(false);
const small = ref(false);
</script>

<template>
  <ComponentPage title="ConfirmCancel">
    <ComponentPageSection title="ConfirmCancel">
      <div class="">
        <BConfirmCancel
          :vertical="vertical"
          :small="small"
          :cancel-variant="(cancelButtonVariant as ButtonVariant)"
          :confirm-variant="(confirmButtonVariant as ButtonVariant)"
          :confirm-icon="(confirmIcon as TIcon)"
          :cancel-icon="(cancelIcon as TIcon)"
          :confirm-label="confirmLabel"
          :cancel-label="cancelLabel"
          :confirm-disabled="confirmButtonDisabled"
          :cancel-disabled="cancelButtonDisabled"
          :fill-container="fillContainer"
          :loading="loading"
          :order="(selectedOrder as any)"
          @confirm="confirmRef!.flash()"
          @cancel="cancelRef!.flash()"
        />
      </div>
      <template #controls>
        <section class="flex items-center justify-end gap-2 mb-8">
          <div class="text-sm font-bold">
            Events
          </div>
          <EventFlasher ref="confirmRef" name="confirm" />
          <EventFlasher ref="cancelRef" name="cancel" />
        </section>
        <PropControlBoolean name="Vertical" :value="vertical" @toggle="vertical = !vertical">
          Mainly used in PopConfirm
        </PropControlBoolean>
        <PropControlBoolean name="Cancel disabled" :value="cancelButtonDisabled" @toggle="cancelButtonDisabled = !cancelButtonDisabled" />
        <PropControlBoolean name="Confirm disabled" :value="confirmButtonDisabled" @toggle="confirmButtonDisabled = !confirmButtonDisabled" />
        <PropControlBoolean name="Fill container" :value="fillContainer" @toggle="fillContainer = !fillContainer" />
        <PropControlBoolean name="Loading" :value="loading" @toggle="loading = !loading" />
        <PropControlBoolean name="Small" :value="small" @toggle="small = !small" />
        <PropControlString name="Confirm label" :value="confirmLabel" @change="(value:string) => confirmLabel = value" />
        <PropControlString name="Cancel label" :value="cancelLabel" @change="(value:string) => cancelLabel = value" />
        <PropControlSelect name="Order" :value="selectedOrder" :options="[...orderOptions]" @select="(option:string) => selectedOrder = option" />
        <PropControlSelect name="Confirm variant" :value="confirmButtonVariant" :options="[...buttonVariants]" @select="(option:string) => confirmButtonVariant = option" />
        <PropControlSelect name="Cancel variant" :value="cancelButtonVariant" :options="[...buttonVariants]" @select="(option:string) => cancelButtonVariant = option" />
        <PropControlSelect name="Confirm icon" :value="confirmIcon" :options="[...icons]" @select="(option:string) => confirmIcon = option" />
        <PropControlSelect name="Cancel icon" :value="cancelIcon" :options="[...icons]" @select="(option:string) => cancelIcon = option" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
