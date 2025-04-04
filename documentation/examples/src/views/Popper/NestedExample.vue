<script setup lang="ts">
import { BButton, BPopper, BPopperContent } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPageSection from "../../components/ComponentPageSection.vue";

const rootPopperRef = ref<typeof BPopper | null>(null);
const level1PopperRef = ref<typeof BPopper | null>(null);
const level2PopperRef = ref<typeof BPopper | null>(null);

const onLevel1Open = (targets: HTMLElement[]) => {
  if (!rootPopperRef.value) return;
  rootPopperRef.value.updateClickOutsideTargets(targets);
};
const onLevel2Open = (targets: HTMLElement[]) => {
  if (!rootPopperRef.value) return;
  level1PopperRef.value?.updateClickOutsideTargets(targets);
};
</script>

<template>
  <ComponentPageSection title="Nested poppers">
    <BPopper ref="rootPopperRef" trigger="click">
      <template #default="slotProps">
        <BButton icon="box" label="One" :soft-focus="slotProps && slotProps.visible" />
      </template>
      <template #content>
        <BPopperContent>
          <div class="flex flex-col px-2 py-2 space-y-2">
            <BPopper
              ref="level1PopperRef"
              trigger="click"
              placement="right"
              @open="onLevel1Open"
              @close="() => rootPopperRef?.value?.updateClickOutsideTargets([])"
            >
              <template #default="slotProps">
                <BButton icon="box" label="Two" :soft-focus="slotProps && slotProps.visible" />
              </template>
              <template #content>
                <BPopperContent>
                  <div class="flex flex-col px-2 py-2 space-y-2">
                    <BPopper
                      ref="level2PopperRef"
                      trigger="click"
                      placement="top"
                      @open="onLevel2Open"
                      @close="() => level1PopperRef?.value?.updateClickOutsideTargets([])"
                    >
                      <template #default="slotProps">
                        <BButton icon="box" label="Three" :soft-focus="slotProps && slotProps.visible" />
                      </template>
                      <template #content>
                        <BPopperContent>
                          <div class="flex flex-col px-2 py-2 space-y-2">
                            Well done!
                          </div>
                        </BPopperContent>
                      </template>
                    </BPopper>
                  </div>
                </BPopperContent>
              </template>
            </BPopper>
          </div>
        </BPopperContent>
      </template>
    </BPopper>
  </ComponentPageSection>
</template>
