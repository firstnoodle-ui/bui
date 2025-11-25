export const buttonVariants = ["fill", "outline", "outlineSubtle", "text", "textSubtle", "destructive"] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const ButtonType = ["default", "primary", "error"] as const;
export type TButtonType = (typeof ButtonType)[number];

export const checkboxTypes = ["default", "circle"] as const;
export type TCheckboxType = (typeof checkboxTypes)[number];

export const Orientation = ["horizontal", "vertical"] as const;
export type TButtonGroupOrientation = (typeof Orientation)[number];

export const Alignments = ["start", "center", "end", "stretch"] as const;
export type TAlignment = (typeof Alignments)[number];

export const Justifications = [...Alignments, "between", "around", "evenly"] as const;
export type TJustification = (typeof Justifications)[number];

export type TColumnNavigationOptionBase = {
  id?: string;
  label: string;
  value: string;
  icon?: string;
  textClass?: string;
  disabled?: boolean;
};

export type TColumnNavigationOptionWithChildren = TColumnNavigationOptionBase & {
  type?: "withChildren";
  children?: TColumnNavigationOption[];
};

export type TColumnNavigationOptionWithDescription = TColumnNavigationOptionBase & {
  type?: "withDescription";
  description?: string;
  component?: string;
};

export type TColumnNavigationOption = TColumnNavigationOptionWithChildren | TColumnNavigationOptionWithDescription;

export type TColumnNavigationSelection = {
  path: TColumnNavigationOption[];
  isLeaf: boolean;
};

export const OverlayType = ["default", "blurred"] as const;
export type TOverlayType = (typeof OverlayType)[number];

export const PopperTrigger = ["click", "hover", "focus", "manual"] as const;
export type TPopperTrigger = (typeof PopperTrigger)[number];

export type TPopSelectOption = {
  id?: string | number;
  icon?: TIcon;
  label: string;
  disabled?: boolean;
  meta?: unknown;
};

export type TPopSelectResultFilter<T> = {
  name: string;
  disabled: boolean;
  execute: (record: T) => boolean;
  count?: number;
};

export const statuses = ["Ok", "Not Ok", "Not Applicable"] as const;
export type TStatusSelectStatus = (typeof statuses)[number];

export type TTreeListNode = {
  key: string;
  value: unknown;
  open: boolean;
};

export const icons = [
  "admin",
  "agent",
  "agent-message",
  "agent-reply",
  "arrow-deviate",
  "arrow-down-plus",
  "arrow-down",
  "arrow-from",
  "arrow-left",
  "arrow-move",
  "arrow-right",
  "arrow-sub",
  "arrow-trend",
  "arrow-up-plus",
  "arrow-up",
  "at-symbol",
  "audio",
  "authority",
  "beams",
  "bell",
  "bold",
  "books",
  "box",
  "building",
  "bullet-list",
  "calendar",
  "camera",
  "categories",
  "check-circled",
  "check-outline",
  "check",
  "chevron-down",
  "chevron-down-small",
  "chevron-left-double",
  "chevron-left",
  "chevron-left-small",
  "chevron-right-double",
  "chevron-right",
  "chevron-right-small",
  "chevron-up",
  "chevron-up-small",
  "clock",
  "close-outline",
  "close",
  "columns",
  "conclusion",
  "conversation",
  "copy",
  "crosshair",
  "dash",
  "dashboard",
  "delete",
  "delta",
  "download",
  "drag",
  "drag-vertical",
  "drilldown",
  "edit",
  "envelope",
  "error",
  "export-document",
  "filter",
  "filters",
  "flag",
  "folder",
  "frequency",
  "fullscreen-off",
  "fullscreen-on",
  "graduate",
  "hamburger",
  "handshake",
  "hash-symbol",
  "heading-1",
  "heading-2",
  "heading",
  "history",
  "home",
  "id-card",
  "id",
  "incognito",
  "indent-left",
  "indent-right",
  "information",
  "insert-below",
  "italics",
  "itenary",
  "keyboard",
  "lightning",
  "link",
  "list-collapse",
  "list-expand",
  "location",
  "lock-locked",
  "lock-unlocked",
  "magnifying-glass",
  "map",
  "match-case",
  "match-diacritics",
  "match-full-word",
  "megaphone",
  "message",
  "message-question",
  "microscope",
  "moon",
  "new-document",
  "news",
  "numbered-list",
  "open-link",
  "options",
  "page",
  "panel-left-show",
  "panel-left-hide",
  "panel-right-show",
  "panel-right-hide",
  "paper-plane",
  "paper",
  "pdf",
  "pen-and-paper",
  "phase",
  "photo",
  "pie-chart",
  "plus",
  "point-left",
  "point-up",
  "popup",
  "question",
  "radio-tower",
  "recycle",
  "redo",
  "refresh",
  "route",
  "rows",
  "scope",
  "settings",
  "share",
  "sign-in",
  "sign-out",
  "sign-up",
  "slideshow",
  "sort-down",
  "sort-up",
  "sort",
  "square-solid",
  "star-solid",
  "star",
  "stop-watch",
  "structure",
  "sun",
  "table",
  "tag",
  "teacher",
  "team",
  "telescope",
  "text-select",
  "trash",
  "triangle-angle",
  "triangle-side",
  "underline",
  "undo",
  "user",
  "venn",
  "video",
  "visibility-off-alt",
  "visibility-off",
  "visibility-on",
  "warning",
  "zoom",
] as const;

export type TIcon = (typeof icons)[number];
