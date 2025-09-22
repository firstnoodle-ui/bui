import type { DateFormat } from "./utils/utils/format";

export type CalendarViewProps = {
  value?: Date | null;
  clearable?: boolean;
  type?: DateFormat;
  format?: DateFormat;
  weekStart?: number;
  disabledDates?: ((date: Date) => boolean)[];
};
