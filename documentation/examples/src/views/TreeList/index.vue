<script setup lang="ts">
import type { TreeNode, TreeNodeAction } from "@firstnoodle-ui/bui";
import type { OrgUnit } from "./data";
import { BTreeList } from "@firstnoodle-ui/bui";
import { ref } from "vue";
import { ComponentPage } from "../../components";
import { tree } from "./data";
import { flattenTree, getNodeValueByPath, openPath, setNodeValueByPath } from "./utils";

const createNewPath = ref<TreeNode<OrgUnit>[]>([]);
const selection = ref<TreeNode<OrgUnit>[]>([]);
const onSelect = (path: TreeNode<OrgUnit>[]) => selection.value = path;

const createNewItem = (path: TreeNode<OrgUnit>[]) => {
  // deselect selected item
  onSelect([]);
  createNewPath.value = path;
  openPath(path);
};

const action: TreeNodeAction<OrgUnit> = {
  label: "Add new",
  icon: "plus",
  handler: createNewItem,
};

const treeData = ref<TreeNode<OrgUnit>>(tree);
treeData.value.children?.forEach((node: TreeNode<OrgUnit>) => node.actions.push(action));

const onCancelNewChild = () => createNewPath.value = [];
const onSaveNewChild = async (name: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 1 second delay
  const allIds = flattenTree(treeData.value).map(item => Number(item.node.id));
  const highestId = Math.max(...allIds);

  const newChild = {
    id: highestId + 1,
    label: name,
    open: false,
    value: {
      name,
      timezone: "test",
    },
    actions: [],
  };
  if (!createNewPath.value[createNewPath.value.length - 1].children) {
    createNewPath.value[createNewPath.value.length - 1].children = [newChild];
  }
  else {
    createNewPath.value[createNewPath.value.length - 1].children?.push(newChild);
  }
  onCancelNewChild();
  onSelect([...createNewPath.value, newChild]);
};

// const { disableClickOutside, enableClickOutside } = useClickOutside(() => selection.value = []);
// const treeListRef = ref<typeof BTreeList>();
// onMounted(() => enableClickOutside([treeListRef.value]));
// onBeforeUnmount(() => disableClickOutside());

const onAction = (e: { path: TreeNode<OrgUnit>[]; action: TreeNodeAction<OrgUnit> }) => {
  action.handler(e.path);
};

const onToggle = (path: TreeNode<OrgUnit>[]) => {
  const currentValue = getNodeValueByPath(treeData.value, path, "open");
  setNodeValueByPath(treeData.value, path, "open", !currentValue);
};

// const onKey = (path:TreeNode<OrgUnit>[], )
</script>

<template>
  <ComponentPage title="Checkbox">
    <template #default="{ print }">
      <BTreeList
        :node="treeData"
        :level="0"
        :selection="selection"
        :create-new-path="createNewPath"
        @action="onAction"
        @cancel-new-child="onCancelNewChild"
        @save="onSaveNewChild"
        @select="(path:TreeNode<OrgUnit>[]) => {
          onSelect(path);
          print(path.map(p => p.label).join(' / '));
        }"
        @toggle="onToggle"
      />
    </template>
  </ComponentPage>
</template>
