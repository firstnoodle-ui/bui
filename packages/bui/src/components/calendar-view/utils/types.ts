export type CalendarOptions = {
  weekStart?: number;
  disabledDates?: ((date: Date) => boolean)[] | any[];
};

export type CalendarGridItem = {
  label: number | string;
  current: boolean;
  date?: string;
  disabled?: boolean;
  inactive?: boolean;
  selected?: boolean;
};
