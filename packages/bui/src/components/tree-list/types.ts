import type { TIcon } from "../types";

// define a list of actions that can somehow be added to each node

export type TreeNodeAction<T> = {
  label: string;
  icon?: TIcon;
  handler: (path: TreeNode<T>[]) => void;
};

export type TreeNode<T> = {
  id: string | number;
  label: string;
  open: boolean;
  value: T;
  children?: TreeNode<T>[];
  actions: TreeNodeAction<T>[];
};

export type TreeNodeEvent<T> = {
  path: TreeNode<T>[];
  targetNode: TreeNode<T>;
};
