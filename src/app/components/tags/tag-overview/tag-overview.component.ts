import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { Transaction } from 'src/app/model/transaction';
import { getMonthRange } from 'src/app/shared/date-utility-functions';
import { currencyFormatter } from 'src/app/shared/grid-utility-functions';
import { findAllTags } from 'src/app/shared/transaction-utility-functions';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-tag-overview',
  templateUrl: './tag-overview.component.html',
  styleUrls: ['./tag-overview.component.css']
})
export class TagOverviewComponent {

  @Input() dateRange: DateRange;

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      console.log('Got transactions: ', this.transactions)
      this.initGridData();
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
      headerName: 'Tag',
      field: 'tag',
    },
    {
      headerName: 'Total',
      field: 'total',
      valueFormatter: currencyFormatter,
    },
    {
      headerName: 'Mean',
      field: 'mean',
      valueFormatter: currencyFormatter,
    },
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.setRowData(this.gridData);
    params.columnApi.autoSizeAllColumns();
  }

  initGridData() {
    const rows = [];
    const months = getMonthRange(this.dateRange).length;
    const tags = findAllTags(this.transactions);
    console.log('Got tags: ', tags)
    tags.forEach(tag => {
      const tagAmt = this.transactions
        .filter(transaction => transaction.tags && transaction.tags.includes(tag))
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
      rows.push({
        tag: tag === '' ? 'Untagged' : tag,
        total: tagAmt,
        mean: (tagAmt / months)
      });
    });
    this.gridData = rows;
    if (this.columnApi) {
      this.columnApi.autoSizeAllColumns();
    }
    this.isLoading = false;
  }

}
