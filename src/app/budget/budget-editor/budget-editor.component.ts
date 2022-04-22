import { Component, OnInit } from '@angular/core';
import { DEFAULT_BUDGET_DATE, TYPE_BUDGET, TYPE_DEFAULT_BUDGET } from 'src/app/shared/transaction-constants';
import { meanAmountByCategory } from 'src/app/shared/transaction-utility-functions';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent {

  BUDGET = TYPE_BUDGET;

  budgetEditorMonth;

  budgetAverageItems: Transaction[];

  constructor(private transactionService: TransactionService) { }

  budgetMonthSelected($event) {
    this.budgetEditorMonth = $event;
  }

  onDateRangeSelected($event) {
    this.transactionService.search($event.start, $event.end, TYPE_BUDGET).subscribe((data: Transaction[]) => {
      this.budgetAverageItems = meanAmountByCategory(data, $event.start, $event.end);
    });
  }

}
