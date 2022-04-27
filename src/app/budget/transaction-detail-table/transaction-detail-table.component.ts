import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { getMonth, getMonthRange, getYear } from 'src/app/shared/date-utility-functions';
import { monthNameMap, SPEND_TRANSACTION_TYPES, typeNameMap } from 'src/app/shared/transaction-constants';
import { convertTransactionsToRows, findAllCategories, getRowMeasuresForType } from 'src/app/shared/transaction-utility-functions';

const BALANCE = 'balance';

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



  monthSubTypes = [...this.gridTransactionTypes, BALANCE];

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



  _dateRange: DateRange;

  @Input() isAbridged = false;

  @Input() set dateRange(value: DateRange) {
    if (value) {
      this.isLoading = true;
      this._dateRange = value;
      this.monthRange = getMonthRange(this.dateRange);
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

  loadTransactionData() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactionsData = data;
      this.initTransactionGridData();
      this.isLoading = false;
    });
  }

  initTransactionGridData() {
    const categories = findAllCategories(this.transactionsData);
    let rowData: any[] = convertTransactionsToRows(this.transactionsData, categories, this.monthRange, this.gridTransactionTypes);
    rowData.push(this.generateTotalRow(rowData));
    const measureTypes = this.isAbridged ? this.monthSubTypes : [BALANCE];
    rowData = getRowMeasuresForType(rowData, measureTypes, this.monthRange.length);
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
    if ( params.colDef.field.includes(BALANCE)) {
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
