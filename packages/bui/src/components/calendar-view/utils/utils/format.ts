
/**
 * Format a date string or object to a readable format (with optional day and time)
 * (Mon) 04 Oct 2021 (23:59)
 */
const formatDateTimeReadable = (value:string|Date, includeDay:boolean = true, includeTime = false): string => {
    const d = new Date(value);
    const day = new Intl.DateTimeFormat('en-001', { weekday: 'short'}).format(d);
    const date = d.getDate().toString().padStart(2, '0');
    const month = new Intl.DateTimeFormat('en-001', { month: 'short'}).format(d);
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    let result = `${date} ${month} ${year}`;

    includeDay && (result = `${day} ${result}`);
    includeTime && (result = `${result} ${hours}:${minutes}`);

    return result;
};

export const readableDate = (value:string|Date):string => formatDateTimeReadable(value, false, false);
export const readableDateWithDay = (value:string|Date):string => formatDateTimeReadable(value, true, false);
export const readableDateTime = (value:string|Date):string => formatDateTimeReadable(value, false, true);
export const readableDateTimeWithDay = (value:string|Date):string => formatDateTimeReadable(value, true, true);


/**
 * Format a date string or object to the default Database date format withoptional time
 * 2021-10-04 (12:59)
 */
const formatDateTimeDB = (value:string|Date, includeTime = false): string => {
    const d = new Date(value);
    const year = d.getFullYear();
    const month = (d.getMonth()+1).toString().padStart(2, '0');
    const date = d.getDate().toString().padStart(2, '0');
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');

    let result = `${year}-${month}-${date}`;
    includeTime && (result = `${result} ${hours}:${minutes}`);

    return result;
};

export const dbDate = (value:string|Date): string => formatDateTimeDB(value, false);
export const dbDateTime = (value:string|Date): string => formatDateTimeDB(value, true);

export const formatDate = {
    readableDate,
    readableDateWithDay,
    readableDateTime,
    readableDateTimeWithDay,
    dbDate,
    dbDateTime,
};

const DateFormat = ['nnDate','nnDateWithDay','nnDateTime','nnDateTimeWithDay','dbDate','dbDateTime'] as const;
export type DateFormat = (typeof DateFormat)[number];

const ReadableDateFormat = ['readableDate','readableDateWithDay','readableDateTime','readableDateTimeWithDay'] as const;
export type ReadableDateFormat = (typeof ReadableDateFormat)[number];

