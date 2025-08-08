export enum TimeUnit {
  MILLISECOND = "MILLISECOND",
  SECOND = "SECOND",
  MINUTE = "MINUTE",
  HOUR = "HOUR",
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
  YEAR = "YEAR",
  DECADE = "DECADE",
}

export const TimeUnitAcronym = {
  MS: TimeUnit.MILLISECOND,
  S: TimeUnit.SECOND,
  M: TimeUnit.MINUTE,
  H: TimeUnit.HOUR,
  D: TimeUnit.DAY,
  W: TimeUnit.WEEK,
  MTH: TimeUnit.MONTH,
  Y: TimeUnit.YEAR,
  DC: TimeUnit.DECADE,
};

export const TimeInMilliseconds = {
  [TimeUnit.MILLISECOND]: 1,
  [TimeUnit.SECOND]: 1000,
  [TimeUnit.MINUTE]: 60000,
  [TimeUnit.HOUR]: 3600000,
  [TimeUnit.DAY]: 86400000,
  [TimeUnit.WEEK]: 604800000,
  [TimeUnit.YEAR]: 3.154e+10,
  [TimeUnit.DECADE]: 3.154e+10 * 10,
};

export const parseTimeUnit = (unit: TimeUnit | string): TimeUnit => {
  if (Object.keys(TimeUnitAcronym).includes(unit)) {
    return (TimeUnitAcronym as any)[unit] as TimeUnit;
  }
  if (Object.keys(TimeUnit).includes(unit)) {
    return unit as TimeUnit;
  }
  throw new Error(`Invalid time unit [${unit}}]`);
};

const validateFormat = (timeString: string): boolean => {
  // eslint-disable-next-line regexp/no-unused-capturing-group
  return /^([012]|[01]\d|2[0-3]):[0-5]\d$/.test(timeString);
};

export const timeToDecimal = (timeString: string): number | null => {
  if (!timeString) return null;
  if (!timeString.includes(":")) throw new Error(`Invalid time format [${timeString}]. Must be in HH:MM format`);
  if (!validateFormat(timeString)) throw new Error(`Invalid time format [${timeString}]. Must be in HH:MM format`);
  const [hours, minutes] = timeString.split(":");
  return Number.parseInt(hours) + Number.parseInt(minutes) / 60;
};

const convertToMilliseconds = (value: number, unit: TimeUnit) => {
  if (typeof value !== "number") throw new Error("Value must be a number");
  const parsedUnit = parseTimeUnit(unit);
  return value * (TimeInMilliseconds[parsedUnit as keyof typeof TimeInMilliseconds] || 1);
};

export const convert = (value: number, from: TimeUnit, to: TimeUnit): number => {
  const parsedFrom = parseTimeUnit(from);
  const parsedTo = parseTimeUnit(to);
  const fromMilliseconds = convertToMilliseconds(value, parsedFrom);
  return fromMilliseconds / (TimeInMilliseconds[parsedTo as keyof typeof TimeInMilliseconds] || 1);
};
