import { Component, OnInit } from '@angular/core';
import { DateRange } from 'src/app/components/date-picker/range/date-range-picker.component';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { DEFAULT_DATE_RANGE, FIELD_CATEGORY } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-budget-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.css']
})
export class BudgetHomeComponent implements OnInit {

  categoryType = FIELD_CATEGORY;

  transactions: Transaction[];

  dateRange: DateRange = DEFAULT_DATE_RANGE;

  categorySelected: string;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  onDateChanged($event: DateRange) {
    this.dateRange = $event;
    this.loadTransactions();
  }

  onCategoryChanged($event) {
    this.categorySelected = $event;
  }
}
