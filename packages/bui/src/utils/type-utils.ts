export const hasValue = <T>(input: T | null | undefined): input is T =>
  input !== undefined && input !== null;

export const hasValueAndNotEmpty = <T>(value: T | undefined | null): value is T =>
  hasValue(value)
  && (typeof value === "string" ? value !== "" : true)
  && (Array.isArray(value) ? value.length > 0 : true);
