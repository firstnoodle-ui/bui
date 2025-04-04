<script setup lang="ts">
import { BButton, BButtonGroup, BPopSelect } from "@firstnoodle/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const options = ["one", "two", "three", "four", "five"].map(o => ({ label: o, value: o }));
// eslint-disable-next-line no-console
const onSelect = (option: string) => console.log(option);
</script>

<template>
  <ComponentPageSection title="ButtonGroup horizontal">
    <div class="pb-4">
      Initially the Buttons could take care of all relevant styling when inside the ButtonGroup, but when buttons are used with tooltip or PopSelect
      (as in this example), the styles have to be applied directly on the buttons.
    </div>
    <BButtonGroup>
      <BPopSelect :options="options" same-width-as-trigger @select="onSelect">
        <template #trigger>
          <BButton tooltip="View settings" bordered icon="eye" label="View setting" type="primary" />
        </template>
      </BPopSelect>
      <BPopSelect :options="options" same-width-as-trigger @select="onSelect">
        <template #trigger>
          <BButton bordered tooltip="Center landscape" label="Center" icon="scope" type="primary" />
        </template>
      </BPopSelect>
      <BButton bordered icon="camera" type="primary" label="Snapshot" tooltip="Take snapshot" />
    </BButtonGroup>
  </ComponentPageSection>
</template>
