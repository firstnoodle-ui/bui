<script setup lang="ts">
import { ref } from "vue";
import { BButton, icons, type ButtonVariant, type TIcon, type TPopSelectOption } from "@firstnoodle/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlString from "../../components/PropControlString.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";

const isSmall = ref(false);
const isRounded = ref(false);
const isLoading = ref(false);
const isDisabled = ref(false);
const isFullwidth = ref(false);
const hasNotification = ref(false);
const label = ref('Label');

const variantOptions:string[] = ['fill', 'outline', 'outlineSubtle', 'text', 'textSubtle', 'destructive'];
const selectedVariant = ref<string|undefined>();

const selectedIcon = ref<string|undefined>();
</script>

<template>
  <ComponentPage title="Button">
    <ComponentPageSection title="Basic usage">
      <BButton
        :small="isSmall"
        :variant="(selectedVariant as ButtonVariant)"
        :loading="isLoading"
        :disabled="isDisabled"
        :fullwidth="isFullwidth"
        :rounded="isRounded"
        :notification="hasNotification"
        :icon="(selectedIcon as TIcon)"
        :label="label"
      />
      <template #controls>
        <PropControlBoolean name="Small" :value="isSmall" @toggle="isSmall = !isSmall" />
        <PropControlBoolean name="Rounded" :value="isRounded" @toggle="isRounded = !isRounded" />
        <PropControlBoolean name="Loading" :value="isLoading" @toggle="isLoading = !isLoading" />
        <PropControlBoolean name="Disabled" :value="isDisabled" @toggle="isDisabled = !isDisabled" />
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option">Will be hidden when <strong>loading=true</strong></PropControlSelect>
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <PropControlSelect name="Variant" :value="selectedVariant" :options="variantOptions" @select="(option:string|undefined) => selectedVariant = option" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
