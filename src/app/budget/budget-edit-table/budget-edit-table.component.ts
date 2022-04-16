import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-budget-edit-table',
  templateUrl: './budget-edit-table.component.html',
  styleUrls: ['./budget-edit-table.component.css']
})
export class BudgetEditTableComponent {

  _budgetItems: Transaction[];

  total = 0;

  @Input() set budgetItems(items: Transaction[]) {
    if (items) {
      items.sort((a, b) => a.category.localeCompare(b.category));
      this._budgetItems = items;
      this.initBudgetForm();
    }
  }

  get budgetItems(): Transaction[] {
    return this._budgetItems;
  }

  budgetForm: FormGroup = this.formBuilder.group({
    categories: this.formBuilder.array([])
  });;

  get categories() {
    return this.budgetForm.controls["categories"] as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {}

  initBudgetForm() {
    this.budgetItems.forEach((transaction: Transaction) => {
      this.addCategory(transaction.category, transaction.amount);
    });
    this.amountChange();
  }

  amountChange() {
    let sum = 0;
    this.categories.getRawValue().forEach(item => {
      sum += item.amount;
    });
    this.total = sum;
  }

  addCategory(name: string = '', amount: number = 0) {
    const categoryForm = this.formBuilder.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required]
    });

    this.categories.push(categoryForm);
  }

  deleteCategory(index: number) {
    this.categories.removeAt(index);
  }

  save() {
    // TO DO.
  }
}
