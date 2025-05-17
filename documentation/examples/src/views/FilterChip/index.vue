<script setup lang="ts">
import { BFilterChip } from "@firstnoodle/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PropControlBoolean from "../../components/PropControlBoolean.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";
import PropControlString from "../../components/PropControlString.vue";
import EventFlasher from "../../components/EventFlasher.vue";
import EventSection from "../../components/EventSection.vue";

const clickFlasher = ref<typeof EventFlasher>();
const deleteFlasher = ref<typeof EventFlasher>();

const isActive = ref(false);
const label = ref('Category');
</script>

<template>
  <ComponentPage title="FilterChip">
    <ComponentPageSection title="Basic usage">
        <BFilterChip :active="isActive" :label="label" @click="clickFlasher?.flash()" @delete="deleteFlasher?.flash()" />
      <template #controls>
        <EventSection>
          <EventFlasher ref="clickFlasher" name="click" />
          <EventFlasher ref="deleteFlasher" name="delete" />
        </EventSection>
        <PropControlBoolean name="Active" :value="isActive" @toggle="isActive = !isActive" />
        <PropControlString name="Label" :value="label" @change="(value:string) => label = value" />
        <!-- <PropControlBoolean name="Small" :value="isSmall" @toggle="isSmall = !isSmall" />
        <PropControlBoolean name="Rounded" :value="isRounded" @toggle="isRounded = !isRounded" />
        <PropControlBoolean name="Loading" :value="isLoading" @toggle="isLoading = !isLoading" />
        <PropControlBoolean name="Disabled" :value="isDisabled" @toggle="isDisabled = !isDisabled" />
        <PropControlBoolean name="Focus" :value="isFocused" @toggle="isFocused = !isFocused" />
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option">
          Will be hidden when <strong>loading=true</strong>
        </PropControlSelect>
        <PropControlSelect name="Variant" :value="selectedVariant" :options="variantOptions" @select="(option:string|undefined) => selectedVariant = option" /> -->
      </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
