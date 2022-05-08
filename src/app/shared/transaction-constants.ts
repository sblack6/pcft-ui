import { DateRange } from "../components/date-picker/range/date-range-picker.component";

/* Transaction Type enum values */
export const TYPE_BUDGET = 'BUDGET';
export const TYPE_DEFAULT_BUDGET = 'DEFAULT_BUDGET';
export const TYPE_INCOME = 'INCOME';
export const TYPE_SAVINGS = 'SAVINGS';
export const TYPE_TRANSACTION = 'TRANSACTION';
export const TYPE_ANNUAL = 'ANNUAL';
export const BALANCE = 'balance';

export const ALL_TRANSACTION_TYPES = [TYPE_BUDGET, TYPE_DEFAULT_BUDGET, TYPE_INCOME, TYPE_SAVINGS, TYPE_TRANSACTION];
/** Transaction types associated with spending & budgeting */
export const SPEND_TRANSACTION_TYPES = [TYPE_BUDGET, TYPE_TRANSACTION];

/* Fields of the transaction type */
export const FIELD_CATEGORY = 'Category';
export const FIELD_TAGS = 'Tag';

/** Date assigned to 'Default Budget' items */
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

/** Default date range to use on app init */
export const DEFAULT_DATE_RANGE: DateRange = {
    start: '2020-12-01',
    end: '2021-01-31'
};

// TODO: temporary date range for testing.
export const TAG_DATE_RANGE: DateRange = {
    start: '2022-03-01',
    end: '2022-04-30'
};

export const DEFAULT_ANNUAL_DATE = '2021-12-31';