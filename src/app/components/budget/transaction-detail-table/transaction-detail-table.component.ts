import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { DateRange } from 'src/app/components/date-picker/range/date-range-picker.component';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { getMonth, getMonthRange, getYear } from 'src/app/shared/date-utility-functions';
import { cellHighlighter, currencyFormatter } from 'src/app/shared/grid-utility-functions';
import { BALANCE, monthNameMap, SPEND_TRANSACTION_TYPES, typeNameMap } from 'src/app/shared/transaction-constants';
import { convertTransactionsToRows, findAllCategories, generateTotalRow, getRowMeasuresForType } from 'src/app/shared/transaction-utility-functions';

@Component({
  selector: 'app-transaction-detail-table',
  templateUrl: './transaction-detail-table.component.html',
  styleUrls: ['./transaction-detail-table.component.css']
})
export class TransactionDetailTableComponent {

  @Input() isAbridged = false;

  @Input() dateRange: DateRange;

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.monthRange = getMonthRange(this.dateRange);
      this.createColumnDefs();
      this.initTransactionGridData();
      this.isLoading = false;
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  isLoading = true;

  gridApi;

  gridData;

  gridTransactionTypes = SPEND_TRANSACTION_TYPES;

  monthSubTypes = [...this.gridTransactionTypes, BALANCE];

  monthRange: string[];

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    skipHeaderOnAutoSize: true
  };

  dollarColumnDefs = {
    valueFormatter: currencyFormatter,
    cellStyle: cellHighlighter,
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
          field: BALANCE + 'mean',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Balance Median',
          field: BALANCE + 'median',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Net Balance',
          field: BALANCE + 'net',
          pinned: 'right',
          columnGroupShow: 'open',
          ...this.dollarColumnDefs,
        },
        {
          headerName: 'Net Balance',
          field: BALANCE + 'net',
          pinned: 'right',
          columnGroupShow: 'closed',
          ...this.dollarColumnDefs,
        },
      ]
    }
  ];
  
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.gridData);
    params.columnApi.autoSizeAllColumns();
  }

  createColumnHeader(month: string, type: string) {
    return monthNameMap.get(getMonth(month)) + ' ' + typeNameMap.get(type);
  }

  createColumnDefs() {
    if (this.isAbridged) {
      this.createSummaryColumnDefs();
    } else {
      this.createMonthColumnDefs();
    }
  }

  createMonthColumnDefs() {
    this.monthRange.forEach(monthYear => {
      this.columnDefs.push({
        headerName: monthNameMap.get(getMonth(monthYear)) + ' ' + getYear(monthYear),
        children: [
          {
            headerName: this.createColumnHeader(monthYear, BALANCE),
            field: monthYear + BALANCE,
            columnGroupShow: 'closed',
            ...this.dollarColumnDefs,
          },
          ...this.monthSubTypes.map(type => {
            return {
              headerName: this.createColumnHeader(monthYear, type),
              field: monthYear + type,
              columnGroupShow: 'open',
              ...this.dollarColumnDefs,
            }
          })
        ]
      });
    });
  }

  createSummaryColumnDefs() {
    const summaryColumns: string[] = this.isAbridged ? this.gridTransactionTypes : [];

    summaryColumns.forEach(columnType => {
      this.columnDefs.push({
        headerName: columnType.substring(0,1) + columnType.substring(1).toLowerCase(),
        children: [
          {
            headerName: 'Mean',
            field: columnType + 'mean',
            columnGroupShow: 'open',
            ...this.dollarColumnDefs,
          },
          {
            headerName: 'Median',
            field: columnType + 'median',
            columnGroupShow: 'open',
            ...this.dollarColumnDefs,
          },
        ]
      })
    })
  }

  initTransactionGridData() {
    const categories = findAllCategories(this.transactions);
    let rowData: any[] = convertTransactionsToRows(this.transactions, categories, this.monthRange, this.gridTransactionTypes);
    const measureTypes = this.isAbridged ? this.monthSubTypes : [BALANCE];
    rowData.push(generateTotalRow(rowData));
    rowData = getRowMeasuresForType(rowData, measureTypes, this.monthRange.length);
    this.gridData = rowData;
  }

}
