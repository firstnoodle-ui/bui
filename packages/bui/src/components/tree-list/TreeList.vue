<script setup lang="ts" generic="T">
import type { TreeNode, TreeNodeAction } from "./types";
import { computed, ref, watch } from "vue";
import { BButton, BFlexbox, BIcon, BPopSelect } from "..";
import InputNode from "./InputNode.vue";
// eslint-disable-next-line import/no-self-import
import TreeList from "./TreeList.vue";

const { createNewPath = [], indentationAmount = 20, node, selection } = defineProps<{
  indentationAmount?: number;
  node: TreeNode<T>;
  level: number;
  selection: TreeNode<T>[];
  createNewPath?: TreeNode<T>[];
}>();

const emit = defineEmits(["action", "cancel-new-child", "key", "save", "select", "toggle"]);

const selected = computed(() => selection.length > 0 && selection[selection.length - 1].id === node.id);
// this could be more specific and check if we are at the same level as well...
const createNewChild = computed(() => createNewPath.length > 0 && createNewPath[createNewPath.length - 1].id === node.id);
watch(() => createNewChild.value, (newValue: boolean, oldValue: boolean) => {
  if (!newValue && oldValue && saving.value) saving.value = false;
  newChildName.value = "";
});
const newChildName = ref("");
const saving = ref(false);
const onSaveNewChild = () => {
  emit("save", newChildName.value);
  saving.value = true;
};
const onCancelNewChild = () => {
  emit("cancel-new-child");
  newChildName.value = "";
};

// eslint-disable-next-line no-console
const onKey = (direction: "left" | "right" | "up" | "down") => console.log(node.label, direction);
const onAction = (action: TreeNodeAction<T>) => emit("action", { path: [node], action });
</script>

<template>
  <BFlexbox
    tag="button"
    justify="between"
    class="w-full h-8 pr-1 gap-0 border-b border-default cursor-pointer"
    :class="{
      'text-white bg-action border-transparent rounded-lg': selected,
      'text-secondary hover:text-primary hover:bg-secondary': !selected,
    }"
    :style="{ paddingLeft: `${level * indentationAmount}px` }"
    @click="emit('select', [node])"
    @keydown.left.stop.prevent
    @keyup.left.stop.prevent="onKey('left')"
    @keydown.right.stop.prevent
    @keyup.right.stop.prevent="onKey('right')"
    @keydown.up.stop.prevent
    @keyup.up.stop.prevent="onKey('up')"
    @keydown.down.stop.prevent
    @keyup.down.stop.prevent="onKey('down')"
  >
    <BFlexbox class="flex-1 min-w-0 pl-1 gap-1">
      <button
        v-if="node.children?.length || createNewChild"
        class="w-4 h-4 flex items-center justify-center rounded cursor-pointer"
        @click.stop.prevent="emit('toggle', [node])"
      >
        <BIcon :name="node.open ? 'chevron-down-small' : 'chevron-right-small'" />
      </button>
      <div v-else class="flex-none w-4 h-4" />
      <span class="text-xs truncate">{{ node.label }}</span>
    </BFlexbox>
    <BFlexbox if="node.actions.length" class="flex-none">
      <BPopSelect
        :options="node.actions"
        placement="bottom-end"
        @select="onAction"
      >
        <template #trigger>
          <BButton
            icon="options"
            small
            variant="textSubtle"
          />
        </template>
      </BPopSelect>
    </BFlexbox>
  </BFlexbox>
  <main v-if="(createNewChild || node.children?.length) && node.open" class="relative">
    <InputNode
      v-if="createNewChild"
      :value="newChildName"
      :indentation="(level + 1) * indentationAmount"
      :saving="saving"
      @change="(value:string) => newChildName = value"
      @save="onSaveNewChild"
      @cancel="onCancelNewChild"
    />

    <TreeList
      v-for="child in node.children"
      :key="child.id"
      :indentation-amount="indentationAmount"
      :level="level + 1"
      :node="child"
      :create-new-path="createNewPath"
      :selection="selection"
      @action="(e:{path:TreeNode<T>[], action:TreeNodeAction<T>}) => emit('action', { path: [node, ...e.path], action: e.action })"
      @cancel-new-child="emit('cancel-new-child')"
      @key="(path:TreeNode<T>[]) => emit('key', [node, ...path])"
      @save="(name:string) => emit('save', name)"
      @select="(path:TreeNode<T>[]) => emit('select', [node, ...path])"
      @toggle="(path:TreeNode<T>[]) => emit('toggle', [node, ...path])"
    />
  </main>
</template>
