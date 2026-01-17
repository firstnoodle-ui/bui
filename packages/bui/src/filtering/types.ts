import type { Ref } from "vue";

export const sortingDirections = ["asc", "desc"] as const;
export type SortingDirection = (typeof sortingDirections)[number];

export const operators = ["=", "!=", "<", "<=", ">", ">="] as const;
export type Operator = (typeof operators)[number];

export const operatorLetters = ["eq", "ne", "lt", "le", "gt", "ge"] as const;
export type OperatorLetters = (typeof operatorLetters)[number];

export type FilterOptions<T, AllowedSortingFields extends NestedKeyOf<T>> = {
  groupId: string;
  filters: Filter<T>[];
  sorting: SortingConfig<T, AllowedSortingFields>;
  items?: Ref<T[]>;
  remoteFilterMethod?: (sorting: TypedSorting<T, AllowedSortingFields>, filters: Filter<T>[]) => Promise<T[]>;
};

export type FilterValue = string | null;

export type Filter<FilteredEntity> = {
  id: string;
  name: string;
  component: string;
  tooltip: string;
  disabled?: boolean;
  allowedOperators: Operator[];
  operator: Operator;
  value: FilterValue;
  execute: (value: FilterValue, operator: Operator, entity: FilteredEntity) => boolean;
};

export type FilterNameAndOperator = {
  id: string;
  operator: OperatorLetters;
};

export type ParsedFilterQuery = {
  id: string;
  operator: Operator;
  value: string;
};

export type ParsedSortingQuery = {
  direction: SortingDirection;
  field: string;
};

export type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? K | `${K}.${NestedKeyOf<T[K]>}`
        : K;
    }[keyof T & string]
  : never;

export type TypedSorting<T, AllowedFields extends NestedKeyOf<T>> = {
  direction: SortingDirection;
  field: AllowedFields;
};

export type SortingConfig<T, AllowedSortingFields extends NestedKeyOf<T>> = {
  default: TypedSorting<T, AllowedSortingFields>;
  sortingMethod: (sorting: TypedSorting<T, AllowedSortingFields>, items: T[]) => T[];
};

export type ParsedFiltersAndSorting = {
  sorting: ParsedSortingQuery | undefined;
  filters: ParsedFilterQuery[];
};
