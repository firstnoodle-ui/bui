import type { FlipOptions, LimitShiftOptions, OffsetOptions, Placement, ShiftOptions } from "@floating-ui/vue";
import type { TPopperTrigger } from "../types";

// Re-export floating-ui types to isolate them
export type BuiPlacement = Placement;
export type BuiFlipOptions = Partial<FlipOptions>;
export type BuiLimitShiftOptions = Partial<LimitShiftOptions>;
export type BuiOffsetOptions = Partial<OffsetOptions>;
export type BuiShiftOptions = Partial<ShiftOptions>;
export type BuiPopperTrigger = TPopperTrigger;

export type PopperProps = {
  closeDelay?: number;
  disabled?: boolean;
  flipOptions?: BuiFlipOptions;
  limitShiftOptions?: BuiLimitShiftOptions;
  offsetOptions?: BuiOffsetOptions;
  shiftOptions?: BuiShiftOptions;
  openDelay?: number;
  placement?: BuiPlacement;
  popperWidthClass?: string;
  rootClass?: string | string[];
  sameWidthAsElement?: HTMLElement;
  sameWidthAsTrigger?: boolean;
  show?: boolean;
  trigger?: BuiPopperTrigger;
  triggerClass?: string | string[];
  useOverlay?: boolean;
};
