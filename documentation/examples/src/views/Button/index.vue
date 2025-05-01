<script setup lang="ts">
import ComponentPage from "../../components/ComponentPage.vue";
import DemoDisabled from "./DemoDisabled.vue";
import DemoHrefMailto from "./DemoHrefMailto.vue";
import DemoIcons from "./DemoIcons.vue";
import DemoLoading from "./DemoLoading.vue";
import DemoNotification from "./DemoNotification.vue";
import DemoRounded from "./DemoRounded.vue";
import DemoTooltip from "./DemoTooltip.vue";
import DemoTypesStyles from "./DemoTypesStyles.vue";
// import DemoButtonGroupHorizontal from "./DemoButtonGroupHorizontal.vue";
// import DemoButtonGroupVertical from "./DemoButtonGroupVertical.vue";
</script>

<template>
  <ComponentPage title="Button">
    <DemoTypesStyles />
    <DemoIcons />
    <DemoRounded />
    <DemoLoading />
    <DemoDisabled />
    <DemoNotification />
    <DemoTooltip />
    <DemoHrefMailto />
  </ComponentPage>
</template>
