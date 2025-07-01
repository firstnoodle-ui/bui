<script setup lang="ts">
import { BTooltip } from "@firstnoodle-ui/bui";
import ComponentPage from "../../components/ComponentPage.vue";

</script>

<template>
  <ComponentPage title="Tooltip">
    <BTooltip text="And you'll see" placement="right">
      <div class="inline text-sm text-primary cursor-pointer">
        Hover me 
      </div>
    </BTooltip>
  </ComponentPage>
</template>
