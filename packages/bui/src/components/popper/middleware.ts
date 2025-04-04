import { size } from "@floating-ui/dom";

export const sameWidthAsTriggerMiddleware = size({
  apply({ rects, elements }) {
    Object.assign(elements.floating.style, {
      width: `${rects.reference.width}px`,
    });
  },
});

export const sameWidthAsElementMiddleware = (element: HTMLElement) => {
  return size({
    apply({ elements }) {
      Object.assign(elements.floating.style, {
        width: `${element.offsetWidth}px`,
      });
    },
  });
};
