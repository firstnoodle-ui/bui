import type { Operator, OperatorLetters } from "../types";

export const lettersToOperator: Record<OperatorLetters, Operator> = {
  eq: "=",
  ne: "!=",
  lt: "<",
  le: "<=",
  gt: ">",
  ge: ">=",
};
export const operatorToLetters: Record<Operator, OperatorLetters> = {
  "=": "eq",
  "!=": "ne",
  "<": "lt",
  "<=": "le",
  ">": "gt",
  ">=": "ge",
};

export const applyOperator = <T extends string | number | null>(a: T, b: T, operator: Operator): boolean => {
  if (a === null || b === null) return false;

  switch (operator) {
    case "=":
      return a === b;
    case "!=":
      return a !== b;
    case "<":
      return a < b;
    case "<=":
      return a <= b;
    case ">":
      return a > b;
    case ">=":
      return a >= b;
  }
};
