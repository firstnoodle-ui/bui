import { onBeforeUnmount, unref } from "vue";

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export const useClickOutside = (handler: Function) => {
  const event = "pointerdown";
  let listener: EventListenerOrEventListenerObject;

  const enableClickOutside = (targets: HTMLElement[]): void => {
    listener = (event: Event) => {
      let elements: HTMLElement | HTMLElement[] = unref(targets);
      if (!elements) return;

      if (!("length" in elements)) elements = [elements];

      const hit = elements.some((el: HTMLElement) => {
        return el === (event.target as HTMLElement) || event.composedPath().includes(el);
      });

      if (hit) return;

      handler(event);
    };

    window.addEventListener(event, listener);
  };

  const updateClickOutside = (targets: HTMLElement[]): void => {
    disableClickOutside();
    enableClickOutside(targets);
  };

  const disableClickOutside = (): void => {
    if (!listener) return;
    window.removeEventListener(event, listener);
  };

  onBeforeUnmount(() => disableClickOutside());

  return {
    enableClickOutside,
    disableClickOutside,
    updateClickOutside
  };
};
