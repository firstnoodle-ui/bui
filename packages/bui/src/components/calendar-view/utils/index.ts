import type { CalendarGridItem, CalendarOptions } from "./types.ts";
import { loopRange } from "../../../utils/array.ts";
import { Direction, Month, Weekday } from "./enums.ts";
import { datesAreEqual, getDecade, moveDate, parseDate } from "./utils/date";
import { TimeUnit } from "./utils/time";

const COLUMN_COUNT: number = 7;
const ROW_COUNT: number = 6;
const CELL_COUNT: number = COLUMN_COUNT * ROW_COUNT;

export class Calendar {
  options: CalendarOptions;
  today: Date;
  selectedDate: Date | null;
  dateCursor: Date | null;

  constructor(options: CalendarOptions, date: string | Date | null = null) {
    this.options = options;
    if (!("weekstart" in options)) {
      this.options.weekStart = Object.values(Weekday).indexOf(Weekday.MONDAY);
    }

    const d = new Date();
    this.today = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
    this.selectedDate = null;
    this.dateCursor = null;
    // this.dateCursor = this.today

    if (date) {
      try {
        const parsedDate = parseDate(date);
        this.setSelectedDate(parsedDate);
      }
      catch (error) {
        console.error(error);
      }
    }
    else {
      this.setSelectedDate(this.today);
    }
  }

  addDaysToDateCursor(days: number): void {
    this.dateCursor!.setUTCDate(this.dateCursor!.getUTCDate() + days);
  }

  addWeeksToDateCursor(weeks: number): void {
    this.addDaysToDateCursor(weeks * 7);
  }

  addMonthsToDateCursor(months: number): void {
    const currentMonth = this.dateCursor!.getUTCMonth();
    const requestedMonth = loopRange(currentMonth + months, Object.values(Month).length);

    // TODO: revisit this - it doesn't seem to be the right solution..
    // change year ?
    const deltaMonths = currentMonth - requestedMonth;
    if (Math.abs(deltaMonths) > 1) {
      if (deltaMonths >= 0) {
        this.addYearsToDateCursor(1);
      }
      else {
        this.addYearsToDateCursor(-1);
      }
    }
    this.dateCursor!.setUTCMonth(requestedMonth);
  }

  addYearsToDateCursor(years: number): void {
    this.dateCursor!.setFullYear(this.dateCursor!.getUTCFullYear() + years);
  }

  getDatesInCurrentMonth(): CalendarGridItem[] {
    const cursor = new Date(
      Date.UTC(
        this.dateCursor!.getUTCFullYear(),
        this.dateCursor!.getUTCMonth(),
        1,
      ),
    );

    // find and set calendar grid start date
    const startDate = !(cursor.getUTCDay() - this.options.weekStart!)
      ? 7
      : loopRange(
          cursor.getUTCDay() - this.options.weekStart!,
          Object.values(Weekday).length,
        );

    cursor.setUTCDate(cursor.getUTCDate() - startDate);

    const dates: CalendarGridItem[] = [];

    for (let row = 0; row < CELL_COUNT; row++) {
      dates.push({
        label: cursor.getUTCDate(),
        date: cursor.toUTCString(),
        disabled: this.options.disabledDates
          ? this.options.disabledDates.some(fn => fn(cursor))
          : false,
        inactive: cursor.getUTCMonth() !== this.dateCursor!.getUTCMonth(),
        selected: Boolean(this.selectedDate) && datesAreEqual(cursor, this.selectedDate as Date),
        current: datesAreEqual(cursor, this.today),
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }

  getDatesInCurrentWeek(): CalendarGridItem[] {
    // TODO
    let cursor = new Date(
      Date.UTC(
        this.dateCursor!.getUTCFullYear(),
        this.dateCursor!.getUTCMonth(),
        this.dateCursor!.getUTCDate(),
      ),
    );
    const offset = loopRange(
      cursor.getUTCDay() - this.options.weekStart!,
      Object.values(Weekday).length,
    );
    cursor = moveDate(cursor, -offset, TimeUnit.DAY);

    const dates: CalendarGridItem[] = [];
    // populate grid
    for (let i = 0; i < 7; i++) {
      dates.push({
        label: cursor.getUTCDate(),
        date: cursor.toUTCString(),
        disabled: this.options.disabledDates
          ? this.options.disabledDates.some(fn => fn(cursor))
          : false,
        inactive:
                    cursor.getUTCMonth() !== this.dateCursor!.getUTCMonth(),
        selected: Boolean(this.selectedDate) && datesAreEqual(cursor, this.selectedDate as Date),
        current: datesAreEqual(cursor, this.today),
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }
    return dates;
  }

  getMonthsInCurrentYear(): CalendarGridItem[] {
    const monthList: CalendarGridItem[] = [];

    for (const [index, month] of Object.values(Month).entries()) {
      monthList.push({
        label: month,
        current:
                    index === this.today.getUTCMonth()
                    && this.dateCursor!.getUTCFullYear()
                    === this.today.getUTCFullYear(),
      });
    }
    return monthList;
  }

  getDateCursorMonthName(): string {
    return Object.values(Month)[this.dateCursor!.getUTCMonth()];
  }

  getYearsInCurrentDecade(): CalendarGridItem[] {
    const yearGrid: CalendarGridItem[] = [];

    const decade = getDecade(this.dateCursor as Date);

    // TODO: use array range
    for (const digit of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
      const year = decade + digit;
      yearGrid.push({
        label: year,
        current: this.today.getUTCFullYear() === year,
      });
    }
    return yearGrid;
  }

  moveSelectedDate(direction: Direction): void {
    let tempDate = new Date(
      Date.UTC(
        this.selectedDate!.getUTCFullYear(),
        this.selectedDate!.getUTCMonth(),
        this.selectedDate!.getUTCDate(),
      ),
    );
    switch (direction) {
      case Direction.UP:
        tempDate = moveDate(tempDate, -7, TimeUnit.DAY);
        break;
      case Direction.DOWN:
        tempDate = moveDate(tempDate, 7, TimeUnit.DAY);
        break;
      case Direction.LEFT:
        tempDate = moveDate(tempDate, -1, TimeUnit.DAY);
        break;
      case Direction.RIGHT:
        tempDate = moveDate(tempDate, 1, TimeUnit.DAY);
        break;
      default:
        throw new Error(`Direction [${direction}] not accepted`);
    }

    if (this.options.disabledDates && this.options.disabledDates.some(fn => fn(tempDate))) {
      return;
    }

    this.setSelectedDate(tempDate);
  }

  setSelectedDate(date: string | Date | null): void {
    if (date) {
      this.selectedDate = parseDate(date);
      this.dateCursor = new Date(
        Date.UTC(
          this.selectedDate!.getUTCFullYear(),
          this.selectedDate!.getUTCMonth(),
          this.selectedDate!.getUTCDate(),
        ),
      );
    }
    else {
      this.selectedDate = null;
      this.dateCursor = new Date();
    }

  }

  setDateCursorDate(date: number): void {
    this.dateCursor!.setUTCDate(date);
  }

  setDateCursorMonth(month: number): void {
    this.dateCursor!.setUTCMonth(month);
  }

  setDateCursorYear(year: number): void {
    this.dateCursor!.setFullYear(year);
  }
}
