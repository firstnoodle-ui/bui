import { parseTimeUnit, TimeInMilliseconds, TimeUnit } from './time.ts'

type StringOrDate = string | Date;

export const dateDelta = (date1:StringOrDate, date2:StringOrDate, timeUnit:TimeUnit):number | null => {
    if (date1 == null || date2 == null) return null;

    date1 = parseDate(date1);
    date2 = parseDate(date2);
    const unit:keyof typeof TimeUnit|null = parseTimeUnit(timeUnit);

    if (!date1 || !date2 || !unit) {
        return null;
    }
    if(unit === TimeUnit.MONTH || unit === TimeUnit.YEAR) {
        throw new Error('Cannot calculate delta in months or years');
    }

    const deltaMilliseconds = date1.getTime() - date2.getTime();

    return deltaMilliseconds / TimeInMilliseconds[unit];
};



export const dateIsAfter = (subjectDate: StringOrDate, targetDate: StringOrDate, includeTarget:boolean = false): boolean => {
    subjectDate = parseDate(subjectDate);
    targetDate = parseDate(targetDate);

    return subjectDate.getTime() > targetDate.getTime() || (includeTarget && datesAreEqual(subjectDate, targetDate));
};



export const dateIsBefore = (subjectDate:StringOrDate, targetDate:StringOrDate, includeTarget:boolean = false): boolean => {
    subjectDate = parseDate(subjectDate);
    targetDate = parseDate(targetDate);

    return subjectDate.getTime() < targetDate.getTime() || (includeTarget && datesAreEqual(subjectDate, targetDate));
};



export const dateIsBetween = (subjectDate:StringOrDate, startDate:StringOrDate, endDate:StringOrDate, includeStartAndEndDates:boolean = false): boolean => {
    return dateIsAfter(subjectDate, startDate, includeStartAndEndDates) && dateIsBefore(subjectDate, endDate, includeStartAndEndDates);
};



export const datesAreEqual = (date1:Date, date2:Date): boolean => {
    date1 = parseDate(date1);
    date2 = parseDate(date2);

    if(!date1 || !date2) return false;

    return (
        date1.getUTCFullYear() === date2.getUTCFullYear() &&
        date1.getUTCMonth() === date2.getUTCMonth() &&
        date1.getUTCDate() === date2.getUTCDate()
    );
};



export const getDecade = (date:Date): number => {
    date = parseDate(date);
    return Math.floor(date.getUTCFullYear() / 10) * 10;
};



export const getWeekNumber = (date:Date): number => {
    const parsedDate = parseDate(date);

    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    parsedDate.setUTCDate(parsedDate.getUTCDate() + 4 - (parsedDate.getUTCDay() || 7));

    // Get first day of year
    const yearStart = new Date(Date.UTC(parsedDate.getUTCFullYear(), 0, 1));

    if(parsedDate && yearStart) {;
        // Calculate full weeks to nearest Thursday
        const weekNumber = Math.ceil(((parsedDate.getTime() - yearStart.getTime()) / TimeInMilliseconds.DAY + 1) / 7);
        return weekNumber;
    }

    return 0;
};



export const moveDate = (date:StringOrDate, value:number, unit:TimeUnit): Date => {
    const parsedDate = parseDate(date);
    const parsedUnit = parseTimeUnit(unit);

    if(parsedUnit === TimeUnit.MONTH) throw new Error('Cannot move date by month');

    let unixTime = parsedDate.getTime();
    unixTime += value * TimeInMilliseconds[parsedUnit as keyof typeof TimeInMilliseconds];
    parsedDate.setTime(unixTime);

    return parsedDate;
};



export const parseDate = (date:StringOrDate): Date => {
    if(typeof date === 'string') date = date.replace(/-/g, '\/');

    const d = new Date(date);
    const dateIsValid = !isNaN(d.getTime()) && !d.toString().includes('Thu Jan 01 1970');

    if(dateIsValid) {
        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    } 
    throw new Error(`Invalid date [${date}]`);
};



export const printDate = (date: Date): void => {
    console.log(
        date
            .toISOString()
            .substr(0, 16)
            .replace('T', ' ')
    );
};



export const stringifyDate = (date: StringOrDate): string | null => {
    const parsedDate = parseDate(date);
    if (!parsedDate) return null;

    return parsedDate.toISOString().substring(0, 10);
};



export const stringifyDatetime = (date:StringOrDate): string | null => {
    date = parseDate(date);
    if (!date) return null;

    return date
        .toISOString()
        .substring(0, 16)
        .replace('T', ' ');
};
