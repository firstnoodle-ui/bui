<script setup lang="ts">
import type { TStatusSelectStatus } from "@firstnoodle-ui/bui";
import { BStatusSelect, BTooltip } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const loading = ref(false);

const selectedStatus = ref<TStatusSelectStatus | null>(null);
const onStatusChange = async (status: TStatusSelectStatus | null) => {
  loading.value = true;
  await new Promise(() =>
    setTimeout(() => {
      selectedStatus.value = status;
      loading.value = false;
    }, 1000),
  );
};
</script>

<template>
  <ComponentPage title="StatusSelect">
    <ComponentPageSection title="Basic usage">
      <div class="flex items-center space-x-2">
        <BTooltip text="Test tip">
          <BStatusSelect :status="selectedStatus" :loading="loading" clearable @change="onStatusChange" />
        </BTooltip>
        <span class="">Status is <strong>{{ selectedStatus || "Not set" }}</strong></span>
      </div>
    </ComponentPageSection>
  </ComponentPage>
</template>
