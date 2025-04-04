<script setup lang="ts">
// import { ref } from "vue";
// import StatusIndicator from "./StatusIndicator.vue";
// import { BPopper, BPopperContent, BPopperOption } from "@firstnoodle-ui/bui";
// import { useNextFrame } from "@/bui/composables";
// import { TStatusSelectStatus } from "../types.ts";

// const emit = defineEmits<{ change: [TStatusSelectStatus | null] }>();

// withDefaults(
//   defineProps<{
//     clearable?: boolean;
//     disabled?: boolean;
//     loading?: boolean;
//     status: TStatusSelectStatus | null;
//   }>(),
//   {
//     clearable: false,
//     disabled: false,
//     loading: false,
//     status: null
//   }
// );

// const { nextFrame } = useNextFrame();

// const popoverRef = ref<typeof BPopper>();
// const contentRef = ref<typeof BPopperContent>();

// const onShow = () => {
//   nextFrame(() => contentRef.value!.focus());
// };

// const onStatusChange = (status: TStatusSelectStatus | null) => {
//   emit("change", status);
//   popoverRef.value && popoverRef.value.close();
// };
</script>

<template>
  TODO
  <!-- <status-indicator v-if="disabled" :status="status" />
  <b-popper v-else ref="popoverRef" trigger="click" trigger-class="flex" placement="bottom" :disabled="loading" :offset-main="4" @show="onShow">
    <template #default="slotProps">
      <status-indicator button :soft-focus="slotProps && slotProps.visible" :status="status" :loading="loading" />
    </template>
    <template #content>
      <b-popper-content ref="contentRef">
        <b-popper-option @click="onStatusChange('Ok')">
          <status-indicator :button="false" status="Ok" />
        </b-popper-option>
        <b-popper-option @click="onStatusChange('Not Ok')">
          <status-indicator :button="false" status="Not Ok" />
        </b-popper-option>
        <b-popper-option @click="onStatusChange('Not Applicable')">
          <status-indicator :button="false" status="Not Applicable" />
        </b-popper-option>
        <b-popper-option v-if="clearable" icon="trash" @click="onStatusChange(null)" class="justify-center py-3" />
      </b-popper-content>
    </template>
  </b-popper> -->
</template>
