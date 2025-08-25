import type { TreeNode } from "@firstnoodle/bui";

export const openPath = <T>(path: TreeNode<T>[]) => {
  path.forEach(node => node.open = true);
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

  currentNode.value[key] = newValue;
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
