import { onUnmounted } from "vue";

/**
 * TrapFocus keeps (loops) the focus inside an element (fx Modal or Dialog), so the user cannot focus on elements outside of it - using the tab key
 *
 * 'trapElement' is the vue ref to the HTML element that we want to trap focus (tabindex) inside
 */

export const useTrapFocus = (trapElement: any, focusFirstElement: boolean = false) => {
  // add all the elements inside modal which you want to make focusable
  const focusableElements = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";

  let firstFocusableElement: HTMLElement;
  let focusableContent: Element[];
  let lastFocusableElement: HTMLElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    const isTabPressed = e.key === "Tab";

    if (!isTabPressed)
      return;

    if (e.shiftKey) {
      if (firstFocusableElement && lastFocusableElement) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement!.focus();
          e.preventDefault();
        }
      }
    }
    else {
      if (firstFocusableElement && lastFocusableElement) {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement!.focus();
          e.preventDefault();
        }
      }
    }
  };

  const trapFocus = () => {
    if (!trapElement.value) {
      console.warn("[useTrapFocus] trapElement is not present");
      return;
    }

    firstFocusableElement = trapElement.value.querySelectorAll(focusableElements)[0] as HTMLElement;
    focusableContent = Array.from(trapElement.value.querySelectorAll(focusableElements));
    lastFocusableElement = focusableContent[focusableElements.length - 1] as HTMLElement;

    document.addEventListener("keydown", handleKeyDown);

    if (firstFocusableElement && focusFirstElement) {
      firstFocusableElement.focus();
    }
  };

  onUnmounted(() => document.removeEventListener("keydown", handleKeyDown));

  return { trapFocus };
};
