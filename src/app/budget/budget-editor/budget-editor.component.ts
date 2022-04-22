import { Component, OnInit } from '@angular/core';
import { TYPE_BUDGET } from 'src/app/shared/transaction-constants';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent implements OnInit {

  defaultBudgetItems: Transaction[];

  selectedMonthBudgetItems: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getDefaultBudget().subscribe((data: Transaction[]) => {
      this.defaultBudgetItems = data;
    });
  }

  budgetMonthSelected($event) {
    this.transactionService.search($event, $event, TYPE_BUDGET).subscribe((data: Transaction[]) => {
      this.selectedMonthBudgetItems = data;
    });
  }

  onDateRangeSelected($event) {
    console.log('Date range selected event: ', $event);
  }

}
