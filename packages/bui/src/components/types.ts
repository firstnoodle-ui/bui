export const ButtonType = ["default", "primary", "error"] as const
export type TButtonType = (typeof ButtonType)[number]

export const Orientation = ["horizontal", "vertical"] as const
export type TButtonGroupOrientation = (typeof Orientation)[number]

export type TColumnNavigationOptionBase = {
  id?: string
  label: string
  value: string
  icon?: string
  textClass?: string
  disabled?: boolean
}

export type TColumnNavigationOptionWithChildren = TColumnNavigationOptionBase & {
  type?: "withChildren"
  children?: TColumnNavigationOption[]
}

export type TColumnNavigationOptionWithDescription = TColumnNavigationOptionBase & {
  type?: "withDescription"
  description?: string
  component?: string
}

export type TColumnNavigationOption = TColumnNavigationOptionWithChildren | TColumnNavigationOptionWithDescription

export type TColumnNavigationSelection = {
  path: TColumnNavigationOption[]
  isLeaf: boolean
}

export const OverlayType = ["default", "blurred"] as const
export type TOverlayType = (typeof OverlayType)[number]

export const PopperTrigger = ["click", "hover", "focus", "manual"] as const
export type TPopperTrigger = (typeof PopperTrigger)[number]

export type TPopSelectOption = {
  id?: string | number
  icon?: TIcon
  label: string
  disabled?: boolean
  meta?: unknown
}

export type TPopSelectResultFilter<T> = {
  name: string
  disabled: boolean
  execute: (record: T) => boolean
  count?: number
}

export const directions = ["up", "down", "left", "right"] as const
export type TScrollDirection = (typeof directions)[number]

export type TScrollTrigger = {
  px: number
  callback: (trigger: TScrollTrigger, direction: TScrollDirection) => void
}

export const statuses = ["Ok", "Not Ok", "Not Applicable"] as const
export type TStatusSelectStatus = (typeof statuses)[number]

export type TTreeListNode = {
  key: string
  value: unknown
  open: boolean
}

export const icons = [
  "add-above",
  "add-below",
  "admin",
  "angle-double-left",
  "angle-double-right",
  "angle-down",
  "angle-left",
  "angle-right",
  "angle-up",
  "arrow-down",
  "arrow-fat-down",
  "arrow-fat-left",
  "arrow-fat-right",
  "arrow-fat-up",
  "arrow-left",
  "arrow-right",
  "arrow-sub",
  "arrow-up",
  "audit",
  "authority",
  "beams",
  "bell",
  "bold",
  "box",
  "building",
  "bullet-list",
  "calendar",
  "camera",
  "categories",
  "check-outline",
  "check",
  "circled-check",
  "clock",
  "close-outline",
  "close",
  "cog",
  "columns",
  "conclusion",
  "copy",
  "crosshair",
  "dash",
  "dashboard",
  "delete",
  "delta",
  "deviation",
  "document",
  "download",
  "drag",
  "drilldown",
  "edit",
  "envelope",
  "error",
  "export-document",
  "eye-closed",
  "eye-hide",
  "eye",
  "filter",
  "filters",
  "flag",
  "folder",
  "frequency",
  "fullscreen-exit",
  "fullscreen",
  "graduate",
  "hamburger",
  "handshake",
  "heading-1",
  "heading-2",
  "heading",
  "home",
  "id-card",
  "id",
  "indent-left",
  "indent-right",
  "index-finger-right",
  "index-finger-up",
  "information",
  "italics",
  "itenary",
  "keyboard",
  "lightning",
  "link",
  "list-collapse",
  "list-expand",
  "location",
  "locked",
  "magnifying-glass",
  "map",
  "megaphone",
  "message",
  "microscope",
  "moon",
  "move",
  "new-document",
  "news",
  "numbered-list",
  "open-link",
  "options",
  "page",
  "paper-plane",
  "pen-and-paper",
  "phase",
  "photo",
  "pie-chart",
  "plus",
  "point-arrow",
  "popup",
  "question",
  "radio-tower",
  "recycle",
  "redo",
  "refresh",
  "route",
  "rows",
  "scope",
  "share",
  "sign-in",
  "sign-up",
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
  "team",
  "telescope",
  "trash",
  "trend",
  "triangle-angle",
  "triangle-side",
  "underline",
  "undo",
  "unlocked",
  "user",
  "venn",
  "video",
  "warning",
] as const

export type TIcon = (typeof icons)[number]
