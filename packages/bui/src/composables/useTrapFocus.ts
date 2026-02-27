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
  const focusableSelector
    = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

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
    const activeEl = document.activeElement as HTMLElement | null;

    // If focus is outside the trap element, redirect it inside
    if (!activeEl || !trapElement.value?.contains(activeEl)) {
      (e.shiftKey ? last : first).focus();
      e.preventDefault();
    }
    else if (e.shiftKey && activeEl === first) {
      last.focus();
      e.preventDefault();
    }
    else if (!e.shiftKey && activeEl === last) {
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
