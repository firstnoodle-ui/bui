<script setup lang="ts">
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
import PopSelectBasicExample from "./PopSelectBasicExample.vue";
// import PopSelectRemoteExample from './PopSelectRemoteExample.vue'
import PopSelectRemoteErrorExample from "./PopSelectRemoteErrorExample.vue";
// import PopSelectRemoteSaveErrorExample from './PopSelectRemoteSaveErrorExample.vue'
</script>

<template>
  <ComponentPage title="PopSelect">
    <ComponentPageSection title="Basic">
      <PopSelectBasicExample />
    </ComponentPageSection>
    <!-- <component-page-section title="Remote (call API) + Result filters">
            <pop-select-remote-example />
        </component-page-section> -->
    <ComponentPageSection title="Remote - Error when querying">
      <PopSelectRemoteErrorExample />
    </ComponentPageSection>
    <!-- <component-page-section title="Remote - Error when saving value">
            <pop-select-remote-save-error-example />
        </component-page-section> -->
  </ComponentPage>
</template>
