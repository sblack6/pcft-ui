import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';

@Component({
  selector: 'app-budget-edit-table',
  templateUrl: './budget-edit-table.component.html',
  styleUrls: ['./budget-edit-table.component.css']
})
export class BudgetEditTableComponent {

  _budgetItems: Transaction[];

  type: string;
  date: string;

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

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) {}

  initBudgetForm() {
    this.type = this.budgetItems[0].type;
    this.date = this.budgetItems[0].date;
    this.budgetItems.forEach((transaction: Transaction) => {
      this.addCategory(transaction.category, transaction.amount, transaction.id);
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

  addCategory(name: string = '', amount: number = 0, id: number = null) {
    const categoryForm = this.formBuilder.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required],
      id: id,
    });

    this.categories.push(categoryForm);
  }

  deleteCategory(index: number) {
    this.categories.removeAt(index);
    this.transactionService.delete(this.categories.controls[index].value.id).subscribe(data => console.log('Delete:', data));
  }

  save() {
    const budgetItemsToSave: Transaction[] = [];
    this.categories.controls.forEach(formControl => {
      const budgetItem: Transaction = {
        id: formControl.value.id,
        category: formControl.value.name,
        amount: formControl.value.amount,
        type: this.type,
        date: this.date,
      }
      budgetItemsToSave.push(budgetItem);
    });
    this.transactionService.create(budgetItemsToSave).subscribe(data => {
      console.log('Saved budget items: ', data)
    });
  }
}
