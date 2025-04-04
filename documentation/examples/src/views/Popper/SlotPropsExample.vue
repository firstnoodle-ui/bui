<script setup lang="ts">
import { BCheckbox, BPopper } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const showPopper1 = ref(0);
const showPopper2 = ref(0);
</script>

<template>
  <ComponentPageSection title="Slot props">
    <main class="flex items-center">
      <section class="w-1/3 flex items-center space-x-2">
        <BCheckbox :value="showPopper1" @click="showPopper1 = showPopper1 ? 0 : 1" />
        <BPopper
          trigger="manual"
          placement="bottom-start"
          disable-click-outside
          :show="Boolean(showPopper1)"
          @open="console.log('open')"
          @close="console.log('close')"
        >
          <template #default="slotProps">
            <div
              class="cursor-default"
              :class="slotProps && slotProps.visible ? 'text-forest-green' : 'text-lava-red'"
            >
              {{ slotProps }}
            </div>
          </template>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
      <section class="w-1/3 flex items-center space-x-2">
        <BPopper trigger="click" :show="Boolean(showPopper2)" placement="bottom-start">
          <template #default="slotProps">
            <button
              class="cursor-pointer"
              :class="slotProps && slotProps.visible ? 'text-forest-green' : 'text-lava-red'"
            >
              {{ slotProps }}
            </button>
          </template>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
    </main>
  </ComponentPageSection>
</template>
