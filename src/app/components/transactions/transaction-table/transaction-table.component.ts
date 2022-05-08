import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { Transaction } from 'src/app/model/transaction';
import { getMonth, getMonthRange, getYear } from 'src/app/shared/date-utility-functions';
import { currencyFormatter } from 'src/app/shared/grid-utility-functions';
import { monthNameMap } from 'src/app/shared/transaction-constants';
import { convertTransactionsToSimpleRows, findAllCategories, generateTotalRow } from 'src/app/shared/transaction-utility-functions';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {

  @Input() monthRange: string[];

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.createColumnDefs();
      this.populateGridData();
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }
  
  isLoading = true;

  gridApi;

  columnApi;

  gridData;

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    skipHeaderOnAutoSize: true
  };

  columnDefs = [
    {
      headerName: 'Category',
      field: 'category',
      pinned: 'right'
    },
    {
      headerName: 'Total',
      field: 'total',
      valueFormatter: currencyFormatter,
    },
  ];

  getHeaderName(monthYear: string): string {
    return monthNameMap.get(getMonth(monthYear)) + ' ' + getYear(monthYear);
  }

  createColumnDefs() {
    this.monthRange.forEach(monthYear => {
      this.columnDefs.push({
        headerName: this.getHeaderName(monthYear),
        field: monthYear,
        valueFormatter: currencyFormatter,
      });
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setRowData(this.gridData);
    params.columnApi.autoSizeAllColumns();
  }

  populateGridData() {
    const categories = findAllCategories(this.transactions);
    const rows = convertTransactionsToSimpleRows(this.transactions, categories, this.monthRange);
    rows.push(generateTotalRow(rows));
    this.gridData = rows;
  }

}
