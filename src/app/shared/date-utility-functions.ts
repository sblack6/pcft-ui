import { DateRange } from "../components/date-picker/range/date-range-picker.component";

export function getMonthYear(date: string): string {
    if (date && date.length == 10) {
        return date.substring(0, 7);
    }
}

export function getMonth(date: string): string {
    if (date && date.length >= 7) {
        return date.substring(5, 7);
    }
}

export function getYear(date: string): string {
    if (date && date.length >= 4) {
        return date.substring(0, 4);
    }
}

export function monthsPassed(startDate: string, endDate: string): number {
    const startYear = Number.parseInt(getYear(startDate));
    const endYear = Number.parseInt(getYear(endDate));
    const startMonth = Number.parseInt(getMonth(startDate));
    const endMonth = Number.parseInt(getMonth(endDate));

    const yearGap = (endYear - startYear) * 12;
    return endMonth - startMonth + yearGap + 1;
}

export function getMonthRange(dateRange: DateRange): string[] {
    const startMonthYear = getMonthYear(dateRange.start);
    const endMonthYear = getMonthYear(dateRange.end);

    let currentMonthYear = startMonthYear;
    const monthRange = [startMonthYear];

    let isStartEqualEnd = startMonthYear === endMonthYear;
    while (!isStartEqualEnd) {
        currentMonthYear = iterateMonthYear(currentMonthYear);
        monthRange.push(currentMonthYear);
        isStartEqualEnd = currentMonthYear === endMonthYear;
    }

    return monthRange;
}

export function getYearRange(dateRange: DateRange): string[] {
    const startYear = getYear(dateRange.start);
    const endYear = getYear(dateRange.end);

    let currentYear = Number.parseInt(startYear);
    const yearRange = [startYear + '-01-01'];

    let isStartEqualEnd = startYear === endYear;
    while (!isStartEqualEnd) {
        currentYear++;
        yearRange.push(currentYear + '-01-01');
        isStartEqualEnd = currentYear.toString() === endYear;
    }
    return yearRange;
}

function iterateMonthYear(monthYear: string): string {
    let month = Number.parseInt(getMonth(monthYear));
    let year = Number.parseInt(getYear(monthYear));
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    return year.toString() + '-' + ('0'+month).slice(-2);
}