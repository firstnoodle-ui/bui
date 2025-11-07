/**
 * Re-exported types from @floating-ui/core
 * This allows consumers to import these types from our package
 * while keeping @floating-ui/core as a peer dependency
 */
export type {
  LimitShiftOptions,
  Placement,
} from "@floating-ui/core";

/**
 * Re-exported types from @floating-ui/dom
 * These are the DOM-specific versions of the core types
 */
export type {
  FlipOptions,
  OffsetOptions,
  ShiftOptions,
} from "@floating-ui/dom";
