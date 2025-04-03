/**
 * Modulo function that works with negative numbers as well
 */
export const loopRange = (index: number, length: number): number => {
  return ((index % length) + length) % length;
};

export const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
