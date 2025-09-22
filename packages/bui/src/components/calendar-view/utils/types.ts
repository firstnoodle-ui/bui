export type CalendarOptions = {
  weekStart?: number;
  disabledDates?: ((date: Date) => boolean)[];
};

export type CalendarGridItem = {
  label: number | string;
  current: boolean;
  date?: Date;
  disabled?: boolean;
  inactive?: boolean;
  selected?: boolean;
};
