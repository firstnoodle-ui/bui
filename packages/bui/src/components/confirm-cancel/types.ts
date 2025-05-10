import { type ButtonVariant, type TIcon } from "../types";

export type ConfirmCancelProps = {
    order?: "confirm-first" | "confirm-last";
    cancelButtonIsText?: boolean;
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
  }