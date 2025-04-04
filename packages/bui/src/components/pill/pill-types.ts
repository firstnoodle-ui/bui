export const LogicOperator = ["=", "!=", "<=", ">="] as const;
export type TLogicOperator = (typeof LogicOperator)[number];
