<script setup lang="ts">
import ComponentPage from "../../components/ComponentPage.vue";
import CascaderExample from "./CascaderExample.vue";
import NestedExample from "./NestedExample.vue";
import PlacementExample from "./PlacementExample.vue";
import PopOverExample from "./PopOverExample.vue";
import SlotPropsExample from "./SlotPropsExample.vue";
import TriggerExample from "./TriggerExample.vue";
</script>

<template>
  <ComponentPage>
    <CascaderExample />
    <TriggerExample />
    <PlacementExample />
    <SlotPropsExample />
    <NestedExample />
    <PopOverExample />
  </ComponentPage>
</template>
