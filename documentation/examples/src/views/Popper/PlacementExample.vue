<script setup lang="ts">
import { BPopper } from "@firstnoodle-ui/bui";
import ComponentPageSection from "../../components/ComponentPageSection.vue";
</script>

<template>
  <ComponentPageSection title="Placement">
    <main class="flex items-center">
      <section class="w-1/3">
        <BPopper placement="bottom-start">
          <div class="cursor-default py-1 px-2 rounded-full bg-granite-grey-15">
            bottom-start
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
      <section class="w-1/3">
        <BPopper placement="left">
          <div class="cursor-default py-1 px-2 rounded-full bg-granite-grey-15">
            left
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
      <section class="w-1/3">
        <BPopper placement="top-end">
          <div class="cursor-default py-1 px-2 rounded-full bg-granite-grey-15">
            top-end
          </div>
          <template #content>
            Pop!
          </template>
        </BPopper>
      </section>
    </main>
  </ComponentPageSection>
</template>
