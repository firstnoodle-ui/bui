// export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

// needs an object as param to have optional min and max
export const clamp = (value: number, min: number | null, max: number | null) => {
  if (min !== null && max !== null) return Math.min(Math.max(value, min), max);
  if (min === null && max !== null) return Math.max(value, max);
  if (min !== null && max === null) return Math.min(value, min);
  return value;
};
