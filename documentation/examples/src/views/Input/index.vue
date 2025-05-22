<script setup lang="ts">
import { ref } from "vue";
import { BInput, icons, type TIcon } from "@firstnoodle-ui/bui";
import { 
  ComponentPage,
  ComponentPageSection,
  EventFlasher,
  EventSection,
  PropControlBoolean,
  PropControlSelect,
  PropControlString
} from "../../components";

const str = ref('');
const placeholder = ref('Write something');
const selectedIcon = ref<string | undefined>();

const changeFlasher = ref<typeof EventFlasher>();
const enterFlasher = ref<typeof EventFlasher>();
const clearFlasher = ref<typeof EventFlasher>();
const clearable = ref(false);
</script>

<template>
  <ComponentPage title="Input">
    <ComponentPageSection title="Basic usage">
      <BInput
        :value="str"
        :icon="(selectedIcon as TIcon)"
        :placeholder="placeholder"
        :clearable="clearable"
        @change="(newValue:string) => {
          str = newValue;
          changeFlasher?.flash();
        }" 
        @enter="enterFlasher?.flash()"
        @clear="clearFlasher?.flash()"
      />
        <template #controls>
          <EventSection>
            <EventFlasher ref="changeFlasher" name="change" />
            <EventFlasher ref="enterFlasher" name="enter" />
            <EventFlasher ref="clearFlasher" name="clear" />
          </EventSection>
        <PropControlString name="Placeholder" :value="placeholder" @change="(value:string) => placeholder = value"/>
        <PropControlSelect name="Icon" clearable :value="selectedIcon" :options="[...icons]" @select="(option:string|undefined) => selectedIcon = option"/>
        <PropControlBoolean name="Clearable" :value="clearable" @toggle="clearable = !clearable" />
        </template>
    </ComponentPageSection>
  </ComponentPage>
</template>
