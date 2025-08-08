import { range } from "../../../../utils/array";
import { Weekday } from "../enums";
import { parseDate } from "./date";

/**
 * Premade disable-function to disable weekend (saturday and sunday)
 */
export const isWeekend = (date: string | Date): boolean | null => {
  const parsedDate = parseDate(date);
  if (!parsedDate) return null;
  const dayIndex: number = parsedDate.getUTCDay();
  return dayIndex === 0 || dayIndex === 6;
};

/**
 * Premade disable-function to disable workdays (monday - friday)
 */
export const disableWorkDays = (date: string | Date): boolean | null => {
  const parsedDate = parseDate(date);

  if (!parsedDate) return null;

  const dayIndex = parsedDate.getUTCDay();
  const weekDays: number[] = range(1, 5);
  return weekDays.includes(dayIndex);
};

/**
 * Get index of weekday - fx 3 for 'wednesday'
 */
export const getWeekdayIndex = (weekDayString: string): number => {
  const weekdays = Object.values(Weekday) as string[];

  if (!weekdays.includes(weekDayString.toLowerCase())) {
    throw new Error(`Invalid weekday [${weekDayString}]`);
  }

  return weekdays.indexOf(weekDayString);
};

/**
 * Premade disable-function to disable specific weekDay
 * Accepts both an integer 0-6 or a string fx 'monday'
 */
export const disableWeekday = (weekDay: number | string): Function => {
  let dayIndex: number | null;

  if (typeof weekDay === "string") {
    dayIndex = getWeekdayIndex(weekDay);
  }
  else {
    dayIndex = weekDay;
  }

  return (date: string | Date): boolean | null => {
    const parsedDate = parseDate(date);
    if (!parsedDate) return null;
    return parsedDate.getUTCDay() === dayIndex;
  };
};

/**
 * Return the weekday from a date string or object
 * Monday
 */
export const getWeekday = (value: string | Date): string => {
  const d = new Date(value);
  const day = new Intl.DateTimeFormat("en-001", { weekday: "long" }).format(d);
  return `${day}`;
};
