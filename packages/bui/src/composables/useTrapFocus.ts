import type { Ref } from "vue";
import { onUnmounted } from "vue";

/**
 * TrapFocus keeps (loops) the focus inside an element (fx Modal or Dialog), so the user cannot focus on elements outside of it - using the tab key
 *
 * 'trapElement' is the vue ref to the HTML element that we want to trap focus (tabindex) inside
 */

export const useTrapFocus = (
  trapElement: Ref<HTMLElement | null | undefined>,
  focusFirstElement: boolean = false,
) => {
  const focusableSelector =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const getFocusableElements = (): HTMLElement[] => {
    if (!trapElement.value) return [];
    return Array.from(trapElement.value.querySelectorAll<HTMLElement>(focusableSelector));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab") return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  };

  const trapFocus = () => {
    if (!trapElement.value) {
      console.warn("[useTrapFocus] trapElement is not present");
      return;
    }

    document.addEventListener("keydown", handleKeyDown);

    if (focusFirstElement) {
      const focusable = getFocusableElements();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }
  };

  const releaseFocus = () => {
    document.removeEventListener("keydown", handleKeyDown);
  };

  onUnmounted(releaseFocus);

  return { trapFocus, releaseFocus };
};
