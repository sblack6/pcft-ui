export const TYPE_BUDGET = 'BUDGET';
export const TYPE_DEFAULT_BUDGET = 'DEFAULT_BUDGET';
export const TYPE_INCOME = 'INCOME';
export const TYPE_SAVINGS = 'SAVINGS';
export const TYPE_TRANSACTION = 'TRANSACTION';

export const ALL_TRANSACTION_TYPES = [TYPE_BUDGET, TYPE_DEFAULT_BUDGET, TYPE_INCOME, TYPE_SAVINGS, TYPE_TRANSACTION];

export const SPEND_TRANSACTION_TYPES = [TYPE_BUDGET, TYPE_TRANSACTION];

export const DEFAULT_BUDGET_DATE = "1970-01-01";

export const typeNameMap = new Map([
    ['BUDGET', 'Budget'],
    ['TRANSACTION', 'Spend'],
    ['balance', 'Net']
  ]);

export const monthNameMap = new Map([
    ['01', 'Jan'],
    ['02', 'Feb'],
    ['03', 'Mar'],
    ['04', 'Apr'],
    ['05', 'May'],
    ['06', 'Jun'],
    ['07', 'Jul'],
    ['08', 'Aug'],
    ['09', 'Sep'],
    ['10', 'Oct'],
    ['11', 'Nov'],
    ['12', 'Dec'],
]);

export const DEFAULT_DATE_RANGE = {
    start: '2020-12-01',
    end: '2021-01-31'
};