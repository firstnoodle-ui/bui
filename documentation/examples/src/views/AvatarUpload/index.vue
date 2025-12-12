<script setup lang="ts">
import { BAvatarUpload } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import {
  ComponentPage,
  PropControlBoolean,
  PropControlSelect,
  PropControlString,
} from "../../components";

const avatarUrl = ref<string | null>(null);
const size = ref(120);
const cropShape = ref<"circle" | "square">("circle");
const disabled = ref(false);
const placeholder = ref("Upload Avatar");
</script>

<template>
  <ComponentPage>
    <template #default="{ print }">
      <div class="w-full flex justify-center">
        <BAvatarUpload
          v-model="avatarUrl"
          :size="size"
          :crop-shape="cropShape"
          :disabled="disabled"
          :placeholder="placeholder"
          @change="(value: string | null) => {
            print(`Avatar changed: ${value ? 'Image uploaded' : 'Image removed'}`);
          }"
        />
      </div>
    </template>
    <template #controls>
      <PropControlSelect
        name="Size"
        :value="size.toString()"
        :options="['80', '120', '160', '200']"
        @select="(option: string | undefined) => size = Number(option ?? 120)"
      />
      <PropControlSelect
        name="Crop Shape"
        :value="cropShape"
        :options="['circle', 'square']"
        @select="(option: 'circle' | 'square' | undefined) => cropShape = option ?? 'circle'"
      />
      <PropControlBoolean
        name="Disabled"
        :value="disabled"
        @toggle="disabled = !disabled"
      />
      <PropControlString
        name="Placeholder"
        :value="placeholder"
        @change="(value: string) => placeholder = value"
      />
    </template>
  </ComponentPage>
</template>
