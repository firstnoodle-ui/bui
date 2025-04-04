export type BarProperties = {
  offset: string;
  scroll: string;
  scrollSize: string;
  size: string;
  key: string;
  axis: string;
  client: string;
  direction: string;
};

export type ThumbDragEvent = {
  scrollReference: string;
  positionPercentage: number;
  scrollSize: number;
};

export const egdes = ["top", "bottom", "left", "right"] as const;
export type ScrollEdge = (typeof egdes)[number];

export type ScrollIntersectionEvent = {
  edge: ScrollEdge;
  hit: boolean;
};

export const directions = ["up", "down", "left", "right"] as const;
export type ScrollDirection = (typeof directions)[number];

export type ScrollTrigger = {
  px: number;
  callback: (trigger: ScrollTrigger, direction: ScrollDirection) => void;
};
