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
  data: T;
  children?: TreeNode<T>[];
  actions: TreeNodeAction<T>[];
};

export type TreeNodeEvent<T> = {
  path: TreeNode<T>[];
  targetNode: TreeNode<T>;
};

export type TreeNodeActionEvent<T> = TreeNodeEvent<T> & {
  action: TreeNodeAction<T>;
};

export type TreeNodeIdKey<T> = {
  // Ensure that the key is either a string or a number and is a keyof T
  [K in keyof T]: T[K] extends number | string ? K : never;
}[keyof T];

export type TreeNodeParentIdKey<T> = {
  // Ensure that the key is either a string or a number and is a keyof T
  [K in keyof T]: T[K] extends number | string | null ? K : never;
}[keyof T];

export type TreeNodeLabelKey<T> = {
  // Ensure that the key is a string and is a keyof T
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];
