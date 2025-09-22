import type { ButtonVariant, TIcon } from "../types";

export type ConfirmCancelProps = {
  order?: "confirm-first" | "confirm-last";
  cancelDisabled?: boolean;
  cancelIcon?: TIcon;
  cancelLabel?: string;
  cancelVariant?: ButtonVariant;
  confirmDisabled?: boolean;
  confirmIcon?: TIcon;
  confirmLabel?: string;
  confirmVariant?: ButtonVariant;
  fillContainer?: boolean;
  loading?: boolean;
  small?: boolean;
  vertical?: boolean;
};
