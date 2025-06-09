<script setup lang="ts">
import type { ButtonVariant, TIcon } from "@firstnoodle/bui";
import { BButton, icons } from "@firstnoodle/bui";
import { ref } from "vue";
import {
  ComponentPage,
  ComponentPageSection,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const isSmall = ref(false);
const isRounded = ref(false);
const isLoading = ref(false);
const isDisabled = ref(false);
const isFullwidth = ref(false);
const isSpaceBetween = ref(false);
const isFocused = ref(false);
const hasNotification = ref(false);
const label = ref("Label");

const variantOptions: string[] = ["fill", "outline", "outlineSubtle", "text", "textSubtle", "destructive"];
const selectedVariant = ref<string | undefined>();

const selectedIcon = ref<string | undefined>();
const selectedIconAfter = ref<string | undefined>();
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
        :space-between="isSpaceBetween"
        :rounded="isRounded"
        :focus="isFocused"
        :notification="hasNotification"
        :icon="(selectedIcon as TIcon)"
        :icon-after="(selectedIconAfter as TIcon)"
        :label="label"
      />
      <template #controls>
        <PropControlBoolean name="Small" :value="isSmall" @toggle="isSmall = !isSmall" />
        <PropControlBoolean name="Rounded" :value="isRounded" @toggle="isRounded = !isRounded" />
        <PropControlBoolean name="Fullwidth" :value="isFullwidth" @toggle="isFullwidth = !isFullwidth" />
        <PropControlBoolean name="SpaceBetween" :value="isSpaceBetween" @toggle="isSpaceBetween = !isSpaceBetween">
          Only makes sense when fullwidth is true
        </PropControlBoolean>
        <PropControlBoolean name="Loading" :value="isLoading" @toggle="isLoading = !isLoading" />
        <PropControlBoolean name="Disabled" :value="isDisabled" @toggle="isDisabled = !isDisabled" />
        <PropControlBoolean name="Focus" :value="isFocused" @toggle="isFocused = !isFocused" />
        <PropControlBoolean name="Notification" :value="hasNotification" @toggle="hasNotification = !hasNotification" />
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option">
          Will be hidden when <strong>loading=true</strong>
        </PropControlSelect>
        <PropControlSelect name="Icon after" clearable :value="selectedIconAfter" :options="[...icons]" @select="(option:string|undefined) => selectedIconAfter = option">
          Will be hidden when <strong>loading=true</strong>
        </PropControlSelect>
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <PropControlSelect name="Variant" :value="selectedVariant" :options="variantOptions" @select="(option:string|undefined) => selectedVariant = option" />
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
