import { Component, Input } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { SPEND_TRANSACTION_TYPES, TYPE_BUDGET, TYPE_TRANSACTION } from 'src/app/shared/transaction-constants';
import { getMonthRange, sortTransactionsByCategory, sumTransactionsByMonthAndType } from 'src/app/shared/transaction-utility-functions';

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

  columnDefs: any[] = [{
    headerName: 'Category',
    field: 'category',
    pinned: 'left',
  }];

  _dateRange: DateRange;

  @Input() set dateRange(value: DateRange) {
    if (value) {
      this.isLoading = true;
      this._dateRange = value;
      this.createGridHeaders();
      this.loadTransactionData();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  constructor(private transactionService: TransactionService) { }

  createColumnKey(month: string, type: string) {
    return month + '-' + type;
  }

  createColumnHeader(month: string, type: string) {
    return month + ' ' + type;
  }

  createGridHeaders() {
    const monthRange = getMonthRange(this.dateRange);
    monthRange.forEach(month => {
      this.monthSubTypes.forEach(type => {
        this.columnDefs.push({
          headerName: this.createColumnHeader(month, type),
          field: this.createColumnKey(month, type),
        });
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
      Array.from(monthToTypeToAmountMap.entries()).forEach(([month, typeToAmountMap]) => {
        Array.from(typeToAmountMap.entries()).forEach(([type, amount]) => {
          const key = this.createColumnKey(month, type);
          rowEntry[key] = amount;
        });
        rowEntry[this.createColumnKey(month ,'balance')] = typeToAmountMap.get(TYPE_BUDGET) + typeToAmountMap.get(TYPE_TRANSACTION);
      });
      rowData.push(rowEntry);
    });

    this.gridData = rowData;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.setRowData(this.gridData);
  }

}
