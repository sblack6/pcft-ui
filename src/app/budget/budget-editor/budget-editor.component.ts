import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../model/transaction';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-budget-editor',
  templateUrl: './budget-editor.component.html',
  styleUrls: ['./budget-editor.component.css']
})
export class BudgetEditorComponent implements OnInit {

  defaultBudgetItems: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionService.getDefaultBudget().subscribe((data: Transaction[]) => {
      this.defaultBudgetItems = data;
      this.initForm();
    });
  }

  initForm() {

  }

}
