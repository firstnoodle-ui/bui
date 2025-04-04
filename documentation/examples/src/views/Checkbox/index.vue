<script setup lang="ts">
import { BCheckbox } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const chekcStatus1 = ref(0);
const chekcStatus2 = ref(0);
const chekcStatus3 = ref(0);
</script>

<template>
  <ComponentPage title="Checkbox">
    <ComponentPageSection title="Basic usage">
      <BCheckbox label="Check it" :value="chekcStatus1" @click="chekcStatus1 = Boolean(chekcStatus1) ? 0 : 1" />
      <BCheckbox label="Check it" :value="chekcStatus1" disabled />
    </ComponentPageSection>
    <ComponentPageSection title="Button tag">
      <BCheckbox button label="Check it" :value="chekcStatus2" @click="chekcStatus2 = Boolean(chekcStatus2) ? 0 : 1" />
      <BCheckbox button label="Check it" :value="chekcStatus2" disabled @click="chekcStatus2 = Boolean(chekcStatus2) ? 0 : 1" />
    </ComponentPageSection>
    <ComponentPageSection title="Circle">
      <BCheckbox type="circle" label="Check it" :value="chekcStatus3" @click="chekcStatus3 = Boolean(chekcStatus3) ? 0 : 1" />
      <BCheckbox type="circle" label="Check it" disabled :value="chekcStatus3" />
    </ComponentPageSection>
  </ComponentPage>
</template>
