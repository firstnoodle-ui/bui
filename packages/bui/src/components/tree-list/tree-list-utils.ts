import type { TreeNode, TreeNodeAction, TreeNodeIdKey, TreeNodeLabelKey, TreeNodeParentIdKey } from "./tree-list-types";

export const openPath = <T>(path: TreeNode<T>[]) => {
  path.forEach(node => (node.open = true));
};

export const getNodeValueByPath = <T, K extends keyof TreeNode<T>>(
  root: TreeNode<T>,
  path: TreeNode<T>[],
  key: K,
): TreeNode<T>[K] | undefined => {
  let currentNode: TreeNode<T> | undefined = root;

  for (const id of path.map(node => node.id)) {
    if (!currentNode || currentNode.id !== id) {
      if (!currentNode?.children) return;
      currentNode = currentNode.children.find((child: TreeNode<T>) => child.id === id);
    }
    if (!currentNode) return;
  }

  return currentNode[key];
};

export const setNodeValueByPath = <T, K extends keyof TreeNode<T>>(
  root: TreeNode<T>,
  path: TreeNode<T>[],
  key: K,
  newValue: TreeNode<T>[K],
): boolean => {
  let currentNode: TreeNode<T> | undefined = root;

  for (const id of path.map(node => node.id)) {
    if (!currentNode || currentNode.id !== id) {
      if (!currentNode?.children) return false;
      currentNode = currentNode.children.find((child: TreeNode<T>) => child.id === id);
    }
    if (!currentNode) return false;
  }

  currentNode[key] = newValue;
  return true;
};

export const setNodeObjectValueByPath = <T, K extends keyof T>(
  root: TreeNode<T>,
  path: TreeNode<T>[],
  key: K,
  newValue: T[K],
): boolean => {
  let currentNode: TreeNode<T> | undefined = root;

  for (const id of path.map(node => node.id)) {
    if (!currentNode || currentNode.id !== id) {
      if (!currentNode?.children) return false;
      currentNode = currentNode.children.find((child: TreeNode<T>) => child.id === id);
    }
    if (!currentNode) return false;
  }

  currentNode.data[key] = newValue;
  return true;
};

/**
 * Flattens a tree structure into an array of nodes with their paths
 * @param root The root node of the tree
 * @param path Optional initial path (used internally for recursion)
 * @returns Array of objects containing the node and its path from root
 */
export const flattenTree = <T>(
  root: TreeNode<T>,
  path: TreeNode<T>[] = [],
): Array<{ node: TreeNode<T>; path: TreeNode<T>[] }> => {
  const currentPath = [...path, root];
  const result = [{ node: root, path: currentPath }];

  if (root.children) {
    for (const child of root.children) {
      result.push(...flattenTree(child, currentPath));
    }
  }

  return result;
};

/**
 * Alternative flatten function that returns just the nodes in depth-first order
 * @param root The root node of the tree
 * @returns Array of all nodes in depth-first traversal order
 */
export const flattenTreeNodes = <T>(root: TreeNode<T>): TreeNode<T>[] => {
  const result: TreeNode<T>[] = [root];

  if (root.children) {
    for (const child of root.children) {
      result.push(...flattenTreeNodes(child));
    }
  }

  return result;
};

export const buildTree = <T extends object>({
  items,
  itemIdField,
  parentIdField,
  labelField,
  treeIsOpen,
  actions,
}: {
  items: T[];
  itemIdField: TreeNodeIdKey<T>;
  parentIdField: TreeNodeParentIdKey<T>;
  labelField: TreeNodeLabelKey<T>;
  treeIsOpen: boolean;
  actions: TreeNodeAction<T>[];
}): TreeNode<T> | null => {
  const idToNode = new Map<T[typeof itemIdField], TreeNode<T>>();
  const rootItem = items.find(item => item[parentIdField] === null);
  if (!rootItem) throw new Error("Cannot construct tree, since no root item exists");

  const childItems = items.filter(item => item[itemIdField] !== rootItem[itemIdField]);

  // Create all nodes except root
  for (const item of childItems) {
    idToNode.set(item[itemIdField], {
      id: item[itemIdField] as unknown as string | number,
      label: item[labelField] as unknown as string,
      open: treeIsOpen,
      data: item,
      actions,
      children: [],
    });
  }

  // Create root node
  const root: TreeNode<T> = {
    id: rootItem[itemIdField] as unknown as string | number,
    label: rootItem[labelField] as unknown as string,
    open: treeIsOpen,
    data: rootItem,
    actions,
    children: [],
  };

  // The queue starts as an array with only the root node
  // But as the loop runs, every time a child node is found and attached to its parent, that child node is also pushed onto the queue
  // This means the queue will grow to include all nodes that have children, not just the root.
  const queue: TreeNode<T>[] = [root];
  while (childItems.length > 0 && queue.length > 0) {
    const parentNode = queue.shift();
    if (!parentNode) break;

    let removed = false;

    for (let i = childItems.length - 1; i >= 0; i--) {
      if (childItems[i][parentIdField] === parentNode.id) {
        const childNode = idToNode.get(childItems[i][itemIdField]);
        if (childNode) {
          (parentNode.children ?? (parentNode.children = [])).push(childNode);
          queue.push(childNode);
        }
        childItems.splice(i, 1); // Remove from array
        removed = true;
      }
    }
    // If nothing was removed and queue is empty, break to avoid infinite loop
    if (queue.length === 0 && !removed && childItems.length > 0) {
      throw new Error(
        `Some items could not be attached to the tree (orphans): ${JSON.stringify(childItems)}`,
      );
    }
  }

  return root;
};
