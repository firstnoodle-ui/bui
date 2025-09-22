import type { Direction } from "../utils/enums";
import type { CalendarGridItem, CalendarOptions } from "../utils/types";
import { onBeforeMount, ref } from "vue";
import { Calendar } from "../utils";
import { TimeUnit } from "../utils/utils/time";

export enum ViewType {
  DATE = TimeUnit.DAY,
  WEEK = TimeUnit.WEEK,
  MONTH = TimeUnit.MONTH,
  YEAR = TimeUnit.YEAR,
  DECADE = TimeUnit.DECADE,
}

export const useCalendar = (value: Date | null = null, options: CalendarOptions) => {

  const calendar = new Calendar(options, value);
  const viewData = ref<CalendarGridItem[] | []>([]);
  const viewType = ref<ViewType>(ViewType.MONTH);
  const viewMonth = ref<string>("");
  const viewYear = ref<number>(0);

  const changeView = (type: ViewType): void => {
    if (!Object.keys(ViewType).includes(type)) {
      console.warn(`[changeView] wrong view type: ${type}`);
      return;
    }

    viewType.value = type;

    switch (type) {
      case ViewType.DATE:
        // TODO
        break;
      case ViewType.WEEK:
        viewData.value = calendar.getDatesInCurrentWeek();
        break;
      case ViewType.MONTH:
        viewData.value = calendar.getDatesInCurrentMonth();
        break;
      case ViewType.YEAR:
        viewData.value = calendar.getMonthsInCurrentYear();
        break;
      case ViewType.DECADE:
        viewData.value = calendar.getYearsInCurrentDecade();
        break;
    }
  };

  const updateView = () => {
    changeView(viewType.value);
    viewMonth.value = calendar.getDateCursorMonthName();
    viewYear.value = calendar.dateCursor!.getUTCFullYear();
  };

  const setSelectedDate = (date: string | Date | null): void => {
    calendar.setSelectedDate(date);
    updateView();
  };

  onBeforeMount(() => {
    setSelectedDate(value);
    changeView(viewType.value);
  });

  const moveRequest = (direction: Direction, keepCurrentView: boolean = false) => {
    // TODO: create eventListener for calendar
    calendar.moveSelectedDate(direction);

    // change back to DateView (if on month or year)
    if (!keepCurrentView && viewType.value !== ViewType.MONTH) {
      changeView(ViewType.DATE);
    }
    else {
      updateView();
    }
  };

  /**
   * Move viewDate (or parts of viewDate: date, month, year) by specified amount
   */
  const moveViewDate = ({ amount, unit }: { amount: number; unit: TimeUnit }): void => {
    switch (unit) {
      case TimeUnit.DAY:
        calendar.addDaysToDateCursor(amount);
        break;
      case TimeUnit.WEEK:
        calendar.addWeeksToDateCursor(amount);
        break;
      case TimeUnit.MONTH:
        calendar.addMonthsToDateCursor(amount);
        break;
      case TimeUnit.YEAR:
        calendar.addYearsToDateCursor(amount);
        break;
      default:
        throw new Error(`[moveViewDate] unknown unit: ${unit}`);
    }
    updateView();
  };

  const setViewDate = (value: number, unit: TimeUnit): void => {
    switch (unit) {
      case TimeUnit.DAY:
        calendar.setDateCursorDate(value);
        break;
      case TimeUnit.MONTH:
        calendar.setDateCursorMonth(value);
        break;
      case TimeUnit.YEAR:
        calendar.setDateCursorYear(value);
        break;
      default:
        console.error(`[setViewDate] unknown unit: ${unit}`);
        return;
    }
    updateView();
  };

  const setViewDateAndChangeView = ({ value, unit, view }: { value: number; unit: TimeUnit; view: ViewType }): void => {
    setViewDate(value, unit);
    changeView(view);
  };

  return {
    selectedDate: calendar.selectedDate,
    viewData,
    viewType,
    viewMonth,
    viewYear,
    changeView,
    moveRequest,
    moveViewDate,
    setSelectedDate,
    setViewDate,
    setViewDateAndChangeView,
  };
};
