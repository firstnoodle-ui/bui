<script setup lang="ts">
import { ref } from "vue";
import { BInput, icons, type TIcon } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PropControlSelect from "../../components/PropControlSelect.vue";
import PropControlString from "../../components/PropControlString.vue";
import EventFlasher from "../../components/EventFlasher.vue";
import EventSection from "../../components/EventSection.vue";

const str = ref('');
const placeholder = ref('Write something');
const selectedIcon = ref<string | undefined>();

const changeFlasher = ref<typeof EventFlasher>();
const enterFlasher = ref<typeof EventFlasher>();
</script>

<template>
  <ComponentPage title="LoadSpinner">
    <ComponentPageSection title="Basic usage">
      <BInput
        :value="str"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        @change="(newValue:string) => {
          str = newValue;
          changeFlasher?.flash();
        }" 
        @enter="enterFlasher?.flash()"
      />
        <template #controls>
          <EventSection>
            <EventFlasher ref="changeFlasher" name="change" />
            <EventFlasher ref="enterFlasher" name="enter" />
          </EventSection>
        <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value"/>
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option"/>
        </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
