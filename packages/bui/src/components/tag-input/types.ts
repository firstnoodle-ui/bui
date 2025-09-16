export type TagInputEntry = {
  id: string;
  value: string;
  error: string | null;
};

export type TagInputValidator = {
  validate: (entry: string) => boolean;
  errorMessage: (entry: string) => string;
};
