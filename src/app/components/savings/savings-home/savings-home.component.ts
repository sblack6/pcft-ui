import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { getMonthRange } from 'src/app/shared/date-utility-functions';
import { DEFAULT_DATE_RANGE, TYPE_SAVINGS } from 'src/app/shared/transaction-constants';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-savings-home',
  templateUrl: './savings-home.component.html',
  styleUrls: ['./savings-home.component.css']
})
export class SavingsHomeComponent implements OnInit {

  _dateRange: DateRange;
  set dateRange(value: DateRange) {
    this._dateRange = value;
    this.monthRange = getMonthRange(this.dateRange);
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  monthRange: string[];

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.dateRange = DEFAULT_DATE_RANGE;
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end, TYPE_SAVINGS).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  onDateChanged($event) {
    this.dateRange = $event;
  }

}
