import { type TagInputValidator } from "./types";

export const tagInputEmailValidator:TagInputValidator = {
  validate: (entry:string) => /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(entry),
  errorMessage: () => 'Invalid format.'
};
