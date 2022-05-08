import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { getYearRange } from 'src/app/shared/date-utility-functions';
import { DEFAULT_ANNUAL_DATE_RANGE, TYPE_ANNUAL } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-cash-flow-home',
  templateUrl: './cash-flow-home.component.html',
  styleUrls: ['./cash-flow-home.component.css']
})
export class CashFlowHomeComponent implements OnInit {

  dateRange = DEFAULT_ANNUAL_DATE_RANGE;

  monthRange: string[];

  transactions: Transaction[];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.monthRange = getYearRange(this.dateRange);
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end, TYPE_ANNUAL).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  onDateChanged($event) {
    this.dateRange = $event;
    this.monthRange = getYearRange(this.dateRange);
  }
}
