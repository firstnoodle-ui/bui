import type { TIcon } from "../types";

const states = ["error", "idle", "loading", "match", "no match"] as const;
export type SelectListState = typeof states[number];

const selectOptionVariants = ["checkbox", "deletable", "single"] as const;
export type SelectOptionVariant = typeof selectOptionVariants[number];

export type SelectListOption = {
  id?: string | number;
  icon?: TIcon;
  label: string;
  disabled?: boolean;
  suffix?: string | number;
  value?: any;
  handler?: (option: SelectListOption) => void;
};

export type SelectListFilter<T> = {
  id?: string | number;
  name: string;
  disabled: boolean;
  execute: (record: T) => boolean;
  count?: number;
};

export type SelectListProps<T> = {
  identifier?: keyof T;
  errorMessage?: string;
  filters?: SelectListFilter<T>[];
  loading?: boolean;
  options: T[];
  placeholder?: string;
  rootClass?: string;
  sameWidthAsTrigger?: boolean;
  searchDebounce?: number;
  searchFunction?: Function | null;
  selectAll?: boolean;
  selected: T | null | T[];
  showSelection?: boolean;
};
