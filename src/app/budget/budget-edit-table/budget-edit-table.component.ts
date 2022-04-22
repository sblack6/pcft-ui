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

  /** The budget items to view/edit */
  budgetItems: Transaction[];

  /** The total of all budget items for this date. */
  total = 0;

  /** The type of budget items */
  _type: string;

  @Input() set type(value: string) {
    if (value) {
      this._type = value;
      this.loadBudgetItems();
    }
  }

  get type(): string {
    return this._type;
  }

  /** The date of the budget items */
  _date: string;

  @Input() set date(value: string) {
    if (value) {
      this._date = value;
      this.loadBudgetItems();
    }
  }

  get date(): string {
    return this._date;
  }

  /** The group of budget items for the user to edit */
  budgetForm: FormGroup;

  get categories() {
    return this.budgetForm.controls["categories"] as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService) {}

  /** Get budget items from the API for the input date and type */
  loadBudgetItems() {
    if (this.type !== null && this.date !== null) {
      this.transactionService.search(this.date, this.date, this.type).subscribe((data: Transaction[]) => {
        this.budgetItems = data;
        this.initBudgetForm();
      });
    }
  }

  /** Initialize the edit form using the budget items retrieved from the API */
  initBudgetForm() {
    this.budgetForm = this.formBuilder.group({
      categories: this.formBuilder.array([])
    });;

    this.budgetItems.forEach((transaction: Transaction) => {
      this.addCategory(transaction.category, transaction.amount, transaction.id);
    });

    this.calculateTotal();
  }

  /** Add a budget category to the edit form */
  addCategory(name: string = '', amount: number = 0, id: number = null) {
    const categoryForm = this.formBuilder.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required],
      id: id,
    });

    this.categories.push(categoryForm);
  }

  /** Delete a budget category */
  deleteCategory(index: number) {
    const budgetItem = this.categories.controls[index];
    if (budgetItem) {
      this.transactionService.delete(budgetItem.value.id).subscribe(data => console.log('Delete:', data));
    }
    this.categories.removeAt(index);
  }

  /** Re-calculate the total */
  calculateTotal() {
    let sum = 0;
    this.categories.controls.forEach(item => {
      sum += item.value.amount;
    });
    this.total = sum;
  }

  /** Save the budget items in the edit form */
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
      this.loadBudgetItems();
    });
  }
}
