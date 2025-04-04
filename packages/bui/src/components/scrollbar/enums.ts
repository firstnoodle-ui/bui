import type { BarProperties } from "./types";

export const horizontalProperties: BarProperties = {
  offset: "offsetWidth",
  scroll: "scrollLeft",
  scrollSize: "scrollWidth",
  size: "width",
  key: "horizontal",
  axis: "X",
  client: "clientX",
  direction: "left",
};

export const verticalProperties: BarProperties = {
  offset: "offsetHeight",
  scroll: "scrollTop",
  scrollSize: "scrollHeight",
  size: "height",
  key: "vertical",
  axis: "Y",
  client: "clientY",
  direction: "top",
};
