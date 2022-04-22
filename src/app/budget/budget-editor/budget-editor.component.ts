import { Component, OnInit } from '@angular/core';
import { DEFAULT_BUDGET_DATE, TYPE_BUDGET, TYPE_DEFAULT_BUDGET } from 'src/app/shared/transaction-constants';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent implements OnInit {

  BUDGET = TYPE_BUDGET;

  budgetEditorMonth;
  
  defaultBudgetItems: Transaction[];

  selectedMonthBudgetItems: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getDefaultBudget().subscribe((data: Transaction[]) => {
      this.defaultBudgetItems = data;
    });
  }

  budgetMonthSelected($event) {
    this.budgetEditorMonth = $event;
  }

  onDateRangeSelected($event) {
    console.log('Date range selected event: ', $event);
  }

}
