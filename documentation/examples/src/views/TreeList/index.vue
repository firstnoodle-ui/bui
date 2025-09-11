<script setup lang="ts">
import type { TreeNode, TreeNodeAction, TreeNodeActionEvent, TreeNodeEvent } from "@firstnoodle-ui/bui";
import type { OrgUnit } from "./data";
import { BHorizontalLayout, BTreeList, BVerticalLayout } from "@firstnoodle-ui/bui";
import { computed, ref } from "vue";
import { ComponentPage } from "../../components";
import { tree } from "./data";
import { flattenTree, getNodeValueByPath, openPath, setNodeValueByPath } from "./utils";

// const { disableClickOutside, enableClickOutside } = useClickOutside(() => selectedPath.value = []);
// const treeListRef = ref<typeof BTreeList>();
// onMounted(() => enableClickOutside([treeListRef.value]));
// onBeforeUnmount(() => disableClickOutside());

const pathToNewItem = ref<TreeNode<OrgUnit>[]>([]);
const selectedPath = ref<TreeNode<OrgUnit>[]>([]);
const selection = computed(() => {
  if (selectedPath.value.length) return selectedPath.value[selectedPath.value.length - 1];
  return null;
});
const onSelect = (path: TreeNode<OrgUnit>[]) => selectedPath.value = path;

const createNewItem = (path: TreeNode<OrgUnit>[]) => {
  // deselect selected item
  onSelect([]);
  pathToNewItem.value = path;
  openPath(path);
};

const action: TreeNodeAction<OrgUnit> = {
  id: "add-new",
  label: "Add new",
  icon: "plus",
  handler: createNewItem,
};

const treeData = ref<TreeNode<OrgUnit>>(tree);
treeData.value.children?.forEach((node: TreeNode<OrgUnit>) => node.actions.push(action));

const onCancelNewChild = () => pathToNewItem.value = [];
const onSaveNewChild = async (name: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // 1 second delay
  const allIds = flattenTree(treeData.value).map(item => Number(item.node.id));
  const highestId = Math.max(...allIds);

  const newChild = {
    id: highestId + 1,
    label: name,
    open: false,
    data: {
      name,
      timezone: "test",
    },
    actions: [],
  } satisfies TreeNode<OrgUnit>;
  if (!pathToNewItem.value[pathToNewItem.value.length - 1].children) {
    pathToNewItem.value[pathToNewItem.value.length - 1].children = [newChild];
  }
  else {
    pathToNewItem.value[pathToNewItem.value.length - 1].children?.push(newChild);
  }
  onCancelNewChild();
  onSelect([...pathToNewItem.value, newChild]);
};

const onAction = (e: TreeNodeActionEvent<OrgUnit>) => {
  console.warn(e);
};

const onToggle = (event: TreeNodeEvent<OrgUnit>) => {
  const path = event.path;
  const currentValue = getNodeValueByPath(treeData.value, path, "open");
  setNodeValueByPath(treeData.value, path, "open", !currentValue);
};

// const onKey = (path:TreeNode<OrgUnit>[], )
</script>

<template>
  <ComponentPage title="Checkbox">
    <template #default="{ print }">
      <BHorizontalLayout borders aside-left-visible class="h-full border border-default">
        <template #aside-left>
          <main class="p-2">
            <BTreeList
              :node="treeData"
              :level="0"
              :selection="selectedPath"
              :create-new-path="pathToNewItem"
              @action="onAction"
              @cancel-new-child="onCancelNewChild"
              @save="onSaveNewChild"
              @select="(event: TreeNodeEvent<OrgUnit>) => {
                console.log(event.targetNode.data)
                onSelect(event.path);
                print(event.path.map(p => p.label).join(' / '));
              }"
              @toggle="onToggle"
            />
          </main>
        </template>
        <template #main>
          <BVerticalLayout>
            <template #header>
              <header class="p-4">
                <h2>{{ selection?.label || "Nothing selected" }}</h2>
              </header>
            </template>
            <template #main>
              <main class="p-4">
                <div>{{ selection?.data.description || 'No description' }}</div>
              </main>
            </template>
          </BVerticalLayout>
        </template>
      </BHorizontalLayout>
    </template>
  </ComponentPage>
</template>
