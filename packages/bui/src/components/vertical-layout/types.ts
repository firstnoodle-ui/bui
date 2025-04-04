export const SectionTypes = ["header", "footer"] as const;
export type TSectionType = (typeof SectionTypes)[number];
