import { Transaction } from "../model/transaction";

export function meanAmountByCategory(transactions: Transaction[], startDate: string, endDate: string): Transaction[] {
    const months = monthsPassed(startDate, endDate);
    console.log('Months passed: ', months)
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

export function monthsPassed(startDate: string, endDate: string): number {
    const startYear = Number.parseInt(startDate.slice(0, 4));
    const endYear = Number.parseInt(endDate.slice(0, 4));
    const startMonth = Number.parseInt(startDate.slice(5, 7));
    const endMonth = Number.parseInt(endDate.slice(5, 7));

    const yearGap = (endYear - startYear) * 12;
    return endMonth - startMonth + yearGap + 1;
}