import type { TIcon } from "../types";

export const states = ["error", "idle", "loading", "match", "no match"] as const;
export type SelectListState = typeof states[number];

export const selectOptionVariants = ["checkbox", "deletable", "single"] as const;
export type SelectOptionVariant = typeof selectOptionVariants[number];

export type SelectListOption = {
  id?: string | number;
  icon?: TIcon;
  label: string;
  disabled?: boolean;
  suffix?: string | number;
  group?: string;
  value?: any;
  handler?: (option: SelectListOption) => void;
};

export type SelectListOptionGroup = {
  id: string | number;
  name?: string;
  options: SelectListOption[];
};

export type SelectListFilter = {
  id?: string | number;
  name: string;
  disabled: boolean;
  execute: (record: SelectListOption) => boolean;
  count?: number;
};

export type SelectListProps = {
  identifier?: keyof SelectListOption;
  errorMessage?: string;
  filters?: SelectListFilter[];
  loading?: boolean;
  options: SelectListOption[] | SelectListOptionGroup[];
  placeholder?: string;
  rootClass?: string;
  sameWidthAsTrigger?: boolean;
  searchDebounce?: number;
  searchFunction?: (query: string) => SelectListOption[] | null;
  selectAll?: boolean;
  selected: SelectListOption | null | SelectListOption[];
  showSelection?: boolean;
};
