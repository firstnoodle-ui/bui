<script setup lang="ts">
import type { TagInputValidator } from "@firstnoodle-ui/bui";
import { BButton, BFlexbox, BTagInput } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import ComponentPage from "../../components/ComponentPage.vue";

const validators: TagInputValidator[] = [
  {
    validate: (entry: string) => /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(entry),
    errorMessage: () => "Invalid format.",
  },
  {
    validate: (entry: string) => entry.endsWith("@dtu.dk"),
    errorMessage: () => "Invalid domain. Only dtu.dk accepted.",
  },
];

const importStr = "mail@test.dk, yolo@mail.com, lego@land.dev, test@dtu.dk, mikkel@dtu.dk";

// create ref and trigger import
const tagInputRef = ref<typeof BTagInput>();
</script>

<template>
  <ComponentPage title="Tag">
    <template #default="{ print }">
      <!-- <BButton label="import" @click="tagInputRef?.importEntries(importStr)" /> -->

      <BFlexbox col class="gap-8">
        <BFlexbox align="start" fullwidth class="gap-2">
          <BFlexbox col align="start" class="flex-1 gap-2">
            <BFlexbox justify="between" class="gap-2">
              <BFlexbox class="gap-2">
                <p class="text-sm text-primary">
                  Role
                </p>
                <BButton small label="Teacher" icon-after="chevron-down-small" variant="outlineSubtle" />
              </BFlexbox>
              <BButton small label="Import" icon="download" variant="textSubtle" @click="tagInputRef?.importEntries(importStr)" />
            </BFlexbox>
            <BFlexbox align="start" class="gap-2">
              <div class="w-full overflow-hidden border border-default rounded-lg focus:border-action focus-within:border-action">
                <BTagInput ref="tagInputRef" placeholder="Emails, comma separated" :validators="validators" />
              </div>
            </BFlexbox>
          </BFlexbox>
          <BFlexbox col>
            <div class="h-8" />
            <BButton
              icon="paper-plane"
              label="Invite"
              class="flex-none"
              @click="print(tagInputRef?.entries)"
            />
          </BFlexbox>
        </BFlexbox>
        <BFlexbox col>
          <h4 class="pb-1 border-b border-default">
            Invited
          </h4>
        </BFlexbox>
      </BFlexbox>
    </template>
  </ComponentPage>
</template>
