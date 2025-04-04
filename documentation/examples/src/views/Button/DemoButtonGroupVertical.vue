<script setup lang="ts">
import { BButton, BButtonGroup, BPopSelect } from "@firstnoodle/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const options = ["one", "two", "three", "four", "five"].map(o => ({ label: o, value: o }));
// eslint-disable-next-line no-console
const onSelect = (option: string) => console.log(option);
</script>

<template>
  <ComponentPageSection title="ButtonGroup vertical">
    <BButtonGroup direction="vertical">
      <BButton bordered disabled icon="arrow-up" type="primary" tooltip="Back to landscape" classes="" />
      <BPopSelect :options="options" placement="left-start" @select="onSelect">
        <template #trigger>
          <BButton tooltip="View settings" bordered icon="eye" type="primary" />
        </template>
      </BPopSelect>
      <BPopSelect :options="options" placement="left-start" @select="onSelect">
        <template #trigger>
          <BButton bordered tooltip="Center landscape" icon="scope" type="primary" />
        </template>
      </BPopSelect>
      <BButton bordered icon="camera" type="primary" tooltip="Take snapshot" classes="" />
    </BButtonGroup>
  </ComponentPageSection>
</template>
