import * as math from "mathjs";
import { Transaction } from "../model/transaction";
import { getMonthYear, monthsPassed } from "./date-utility-functions";

export function findAllCategories(transactions: Transaction[]) {
    const categories: Set<string> = new Set();
    transactions.forEach(transaction => categories.add(transaction.category));
    return categories;
}

export function findAllTags(transactions: Transaction[]): Set<string> {
    const tagSet: Set<string> = new Set();
    transactions.forEach(transaction => {
        if (transaction.tags) {
            transaction.tags.split(',').forEach(tag => tagSet.add(tag));
        }
    });
    return tagSet;
}

export function includesTag(transaction: Transaction, tag: string) {
    let containsTag = false;
    if (tag != null && tag != '' && transaction.tags) {
        containsTag = transaction.tags.toLocaleLowerCase().includes(tag.toLocaleLowerCase());
    } else if (tag === '') {
        containsTag = transaction.tags === null || transaction.tags === '';
    }
    return containsTag;
}

export function convertTransactionsToRows(transactions: Transaction[], categories: Set<string>, months: string[], types: string[]): any[] {
    const rows = [];
    categories.forEach(category => {
        const row = { 'category': category };
        months.forEach(month => {
            types.forEach(type => {
                const amount = transactions.filter(transaction => 
                    transaction.category === category &&
                    getMonthYear(transaction.date)=== month &&
                    transaction.type === type
                ).map(
                    transaction => transaction.amount
                ).reduce((partialSum, a) => partialSum + a, 0);

                row[month + type] = amount;
                row[month + 'balance'] = amount + (row[month+'balance'] ?? 0);
            });
        });
        rows.push(row);
    });
    return rows;
}

export function convertTransactionsToSimpleRows(transactions: Transaction[], categories: Set<string>, months: string[]): any[] {
    const rows = [];
    categories.forEach(category => {
        const row = { 'category': category };
        months.forEach(month => {
            const amount = transactions.filter(transaction => 
                transaction.category === category &&
                getMonthYear(transaction.date)=== month
            ).map(
                transaction => transaction.amount
            ).reduce((partialSum, a) => partialSum + a, 0);

            row[month] = amount;
        });
        rows.push(row);
    });
    return rows;
}

export function generateTotalRow(rowData: any[]) {
    const totalRow = {
      category: 'Total'
    };
    Object.keys(rowData[0]).forEach(key => {
      if (key !== 'category') {
        totalRow[key] = rowData.map(row => row[key] ?? 0).reduce((partialSum, a) => partialSum + a, 0);
      }
    });
    return totalRow;
}

export function getRowMeasuresForType(rows, types: string[], numMonths: number) {
    rows.forEach((row, index) => {
        types.forEach(type => {
            let values = [];
            Object.entries(row).forEach(([key, value]) => {
                if (key.includes(type)) {
                    values.push(value);
                }
            });
            row[type+'net'] = math.sum(...values);
            row[type+'mean'] = math.sum(...values) / numMonths;
            row[type+'median'] = math.median(...values);
            rows[index] = row;
        });
    });
    return rows;
}

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