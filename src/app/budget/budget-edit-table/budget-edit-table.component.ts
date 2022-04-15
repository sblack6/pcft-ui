import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-budget-edit-table',
  templateUrl: './budget-edit-table.component.html',
  styleUrls: ['./budget-edit-table.component.css']
})
export class BudgetEditTableComponent implements OnInit {

  @Input() budgetItems: Transaction[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
