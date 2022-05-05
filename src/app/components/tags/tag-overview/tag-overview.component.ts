import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
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

  isLoading = false;

  transactionsData: Transaction[];

  gridApi;

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
  
  _dateRange: DateRange;
  @Input() set dateRange(value: DateRange) {
    if (value) {
      this._dateRange = value;
      this.loadTransactions();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  constructor(private transactionService: TransactionService) {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.gridData);
    params.columnApi.autoSizeAllColumns();
  }

  loadTransactions() {
    this.isLoading = true;
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactionsData = data;
      this.initGridData();
      this.isLoading = false;
    });
  }

  initGridData() {
    const rows = [];
    const months = getMonthRange(this.dateRange).length;
    const tags = findAllTags(this.transactionsData);
    tags.forEach(tag => {
      const tagAmt = this.transactionsData
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
  }

}
