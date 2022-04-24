import { DateRange } from "../date-picker/range/date-range-picker.component";
import { Transaction } from "../model/transaction";

export function sortTransactionsByCategory(transactions: Transaction[]): Map<string, Transaction[]> {
    const categoryMap: Map<string, Transaction[]> = new Map();
    transactions.forEach(transaction => {
        if (categoryMap.has(transaction.category)) {
            const transactionList = categoryMap.get(transaction.category);
            transactionList.push(transaction);
            categoryMap.set(transaction.category, transactionList);
        } else {
            categoryMap.set(transaction.category, [transaction]);
        }
    });
    return categoryMap;
}

function sortTransactionsByMonth(transactions: Transaction[]): Map<string, Transaction[]> {
    const monthMap: Map<string, Transaction[]> = new Map();
    transactions.forEach(transaction => {
        const month = getMonthYear(transaction.date);
        if (monthMap.has(month)) {
            const transactionList = monthMap.get(month);
            transactionList.push(transaction);
            monthMap.set(month, transactionList);
        } else {
            monthMap.set(month, [transaction]);
        }
    });
    return monthMap;
}

export function sumTransactionsByMonthAndType(transactions: Transaction[], types: string[]): Map<string, Map<string, number>> {
    const monthToTypeToAmountMap: Map<string, Map<string, number>> = new Map();
    const monthMap = sortTransactionsByMonth(transactions);
    Array.from(monthMap.entries()).forEach(([month, transactions]) => {
        const typeToAmountMap: Map<string, number> = new Map();
        types.forEach(type => {
            const transactionsForType = transactions.filter(transaction => transaction.type === type);
            const sumForType = transactionsForType.map(transaction => transaction.amount).reduce((partialSum, a) => partialSum + a, 0);
            typeToAmountMap.set(type, sumForType);
        });
        monthToTypeToAmountMap.set(month, typeToAmountMap);
    });
    return monthToTypeToAmountMap;
}

export function meanAmountByCategory(transactions: Transaction[], startDate: string, endDate: string): Transaction[] {
    const months = monthsPassed(startDate, endDate);
    const categoryToTotalMap: Map<string, Transaction> = new Map();
    transactions.forEach(item => {
        if (categoryToTotalMap.has(item.category)) {
            const currentTotal = categoryToTotalMap.get(item.category);
            currentTotal.amount += item.amount;
            categoryToTotalMap.set(item.category, currentTotal);

        } else {
            categoryToTotalMap.set(item.category, item);
        }
    });
    const meanTransactions: Transaction[] = Array.from(categoryToTotalMap.entries()).map(([_category, transaction]) => {
        transaction.amount = transaction.amount / months;
        return transaction;
    });
    return meanTransactions;
}

function getMonthYear(date: string): string {
    if (date && date.length == 10) {
        return date.substring(0, 7);
    }
}

function getMonth(date: string): string {
    if (date && date.length >= 7) {
        return date.substring(5, 7);
    }
}

function getYear(date: string): string {
    if (date && date.length >= 4) {
        return date.substring(0, 4);
    }
}

function monthsPassed(startDate: string, endDate: string): number {
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

function iterateMonthYear(monthYear: string): string {
    let month = Number.parseInt(getMonth(monthYear));
    let year = Number.parseInt(getYear(monthYear));
    month++;
    if (month > 12) {
        month = 1;
        year++;
    }
    return year.toString() + '-' + month.toString();
}