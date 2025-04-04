<script setup lang="ts">
import { BButton, BSwitch, BTooltip } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const showTooltip = ref(false);
</script>

<template>
  <ComponentPage title="Tooltip">
    <ComponentPageSection title="Placement">
      <section class="flex items-center">
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="right">
            <div class="inline text-sm text-primary cursor-pointer">
              Look right
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="bottom">
            <div class="inline text-sm text-primary cursor-pointer">
              Look down
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="left">
            <div class="inline text-sm text-primary cursor-pointer">
              Look left
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top">
            <div class="inline text-sm text-primary cursor-pointer">
              Look up
            </div>
          </BTooltip>
        </div>
      </section>
    </ComponentPageSection>
    <ComponentPageSection title="Delay">
      <section class="flex items-center">
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top" :delay="100">
            <div class="inline text-sm text-primary cursor-pointer">
              100 ms
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top" :delay="300">
            <div class="inline text-sm text-primary cursor-pointer">
              300 ms
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top" :delay="500">
            <div class="inline text-sm text-primary cursor-pointer">
              500 ms
            </div>
          </BTooltip>
        </div>
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top" :delay="1000">
            <div class="inline text-sm text-primary cursor-pointer">
              1000 ms
            </div>
          </BTooltip>
        </div>
      </section>
    </ComponentPageSection>
    <ComponentPageSection title="Programmatic control (force show)">
      <section class="flex items-center space-x-2">
        <BSwitch :value="showTooltip" @toggle="showTooltip = !showTooltip" />
        <BTooltip text="Here I am" placement="top" :show="showTooltip" trigger="manual">
          <div class="text-sm font-medium">
            Show tooltip
          </div>
        </BTooltip>
      </section>
    </ComponentPageSection>
    <ComponentPageSection title="Colors (bg-color-class & text-color-class)">
      <section class="flex items-center">
        <div class="w-1/4">
          <BTooltip text="Here I am" placement="top" :delay="100" bg-color-class="bg-lava-red" text-color-class="text-black">
            <div class="inline text-sm text-primary cursor-pointer">
              Hover me
            </div>
          </BTooltip>
        </div>
      </section>
    </ComponentPageSection>
    <ComponentPageSection title="Custom content">
      <section class="flex items-center">
        <div class="w-1/4">
          <BTooltip placement="top" :delay="100">
            <div class="inline text-sm text-primary cursor-pointer">
              Hover me
            </div>
            <template #content>
              <BButton small label="check" />
            </template>
          </BTooltip>
        </div>
      </section>
    </ComponentPageSection>
  </ComponentPage>
</template>
