import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import * as math from 'mathjs';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { monthNameMap, SPEND_TRANSACTION_TYPES, typeNameMap, TYPE_BUDGET, TYPE_TRANSACTION } from 'src/app/shared/transaction-constants';
import { getMonth, getMonthRange, getYear, sortTransactionsByCategory, sumTransactionsByMonthAndType } from 'src/app/shared/transaction-utility-functions';

@Component({
  selector: 'app-transaction-detail-table',
  templateUrl: './transaction-detail-table.component.html',
  styleUrls: ['./transaction-detail-table.component.css']
})
export class TransactionDetailTableComponent {

  gridApi;

  isLoading = false;

  transactionsData: Transaction[];

  gridData;

  gridTransactionTypes = SPEND_TRANSACTION_TYPES;

  monthSubTypes = [...this.gridTransactionTypes, 'balance'];

  monthRange: string[];

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    skipHeaderOnAutoSize: true
  };

  dollarColumnDefs = {
    valueFormatter: this.currencyFormatter,
    cellStyle: this.cellHighlighter,
  }

  columnDefs: any[] = [
    {
      headerName: 'Category',
      field: 'category',
      pinned: 'left',
    },
    {
      headerName: 'Balance',

      children: [
        {
          headerName: 'Balance Mean',
          field: 'balance-mean',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Balance Median',
          field: 'balance-median',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Net Balance',
          field: 'balance-total',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Net Balance',
          field: 'balance-total',
          pinned: 'right',
          columnGroupShow: 'closed',
          ...this.dollarColumnDefs,
        },
      ]
    }
  ];

  _dateRange: DateRange;

  @Input() set dateRange(value: DateRange) {
    if (value) {
      this.isLoading = true;
      this._dateRange = value;
      this.createColumnDefs();
      this.loadTransactionData();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  constructor(private transactionService: TransactionService) { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.gridData);
    params.columnApi.autoSizeAllColumns();
  }

  createColumnKey(month: string, type: string) {
    return month + '-' + type;
  }

  createColumnHeader(month: string, type: string) {
    return monthNameMap.get(getMonth(month)) + ' ' + typeNameMap.get(type);
  }

  createColumnDefs() {
    this.monthRange = getMonthRange(this.dateRange);
    this.monthRange.forEach(monthYear => {
      this.columnDefs.push({
        headerName: monthNameMap.get(getMonth(monthYear)) + ' ' + getYear(monthYear),
        children: [
          {
            headerName: this.createColumnHeader(monthYear, 'balance'),
            field: this.createColumnKey(monthYear, 'balance'),
            columnGroupShow: 'closed',
            ...this.dollarColumnDefs,
          },
          ...this.monthSubTypes.map(type => {
            return {
              headerName: this.createColumnHeader(monthYear, type),
              field: this.createColumnKey(monthYear, type),
              columnGroupShow: 'open',
              ...this.dollarColumnDefs,
            }
          })
        ]
      });
    });
  }

  loadTransactionData() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactionsData = data;
      this.initTransactionGridData();
      this.isLoading = false;
    });
  }

  initTransactionGridData() {
    const rowData = [];

    const categoryMap = sortTransactionsByCategory(this.transactionsData);
    Array.from(categoryMap.entries()).forEach(([category, transactions]) => {
      const rowEntry = {
        category: category,
      };
      const monthToTypeToAmountMap = sumTransactionsByMonthAndType(transactions, this.gridTransactionTypes);
      const balances: number[] = [];
      Array.from(monthToTypeToAmountMap.entries()).forEach(([month, typeToAmountMap]) => {
        Array.from(typeToAmountMap.entries()).forEach(([type, amount]) => {
          const key = this.createColumnKey(month, type);
          rowEntry[key] = amount;
        });
        const balance = typeToAmountMap.get(TYPE_BUDGET) + typeToAmountMap.get(TYPE_TRANSACTION);
        rowEntry[this.createColumnKey(month ,'balance')] = balance;
        balances.push(balance);
      });
      rowEntry['balance-total'] = balances.reduce((partialSum, a) => partialSum + a, 0);
      rowEntry['balance-mean'] = rowEntry['balance-total'] / this.monthRange.length;
      rowEntry['balance-median'] = math.median(balances);
      rowData.push(rowEntry);
    });
    rowData.push(this.generateTotalRow(rowData));

    this.gridData = rowData;
  }

  generateTotalRow(rowData: any[]) {
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

  currencyFormatter(params: any) {
    if ( params && params.value) {
      let stringFormat = params.value.toFixed(2);
      if (stringFormat.indexOf('-') != -1 ) {
        stringFormat = stringFormat.replace("-", "- $ ");
      } else {
        stringFormat = '$ ' + stringFormat;
      }
      return stringFormat;
    }
  }

  cellHighlighter(params: any) {
    if ( params.colDef.field.includes('balance')) {
      if (params.value < 0) {
        return {color: '#C70000'}
      } else if (params.value > 0) {
        return {color: '#15BF00'}
      } else {
        return {color: '#000000'}
      }
    }
  }

}
