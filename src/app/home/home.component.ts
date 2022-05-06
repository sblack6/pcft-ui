import { Component, OnInit } from '@angular/core';
import { DateRange } from '../components/date-picker/range/date-range-picker.component';
import { Transaction } from '../model/transaction';
import { TransactionService } from '../service/transaction/transaction.service';
import { DEFAULT_DATE_RANGE } from '../shared/transaction-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  transactions: Transaction[];

  dateRange: DateRange = DEFAULT_DATE_RANGE;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  onDateChanged($event) {
    this.dateRange = $event;
    this.loadTransactions();
  }
}
