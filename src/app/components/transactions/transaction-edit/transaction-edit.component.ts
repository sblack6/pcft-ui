import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent {

  @Input() disableEdit: boolean = false;

  _type: string;
  @Input() set type(value: string) {
    if (value) {
      this._type = value;
      this.loadTransactions();
    }
  }

  get type(): string {
    return this._type;
  }

  _date: string;
  @Input() set date(value: string) {
    if (value) {
      this._date = value;
      this.loadTransactions();
    }
  }

  get date(): string {
    return this._date;
  }

  transactions: Transaction[];

  transactionForm: FormGroup;

  constructor(private transactionService: TransactionService, private formBuilder: FormBuilder) {}

  get categories() {
    return this.transactionForm.controls["categories"] as FormArray;
  }

  loadTransactions() {
    if (!this.type || !this.date) {
      return;
    }
    this.transactionService.search(this.date, this.date, this.type).subscribe((data: Transaction[]) => {
      this.transactions = data;
      this.initBudgetForm();
    });
  }

  /** Initialize the edit form using the budget items retrieved from the API */
  initBudgetForm() {
    this.transactionForm = this.formBuilder.group({
      categories: this.formBuilder.array([])
    });;

    this.transactions.sort((a, b) => a.category.localeCompare(b.category));
    this.transactions.forEach((transaction: Transaction) => {
      this.addCategory(transaction.category, transaction.amount, transaction.id);
    });
    if (this.disableEdit) {
      this.categories.controls.forEach(formControl => formControl.disable());
    }
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
    const transactionItem = this.categories.controls[index];
    if (transactionItem) {
      this.transactionService.delete(transactionItem.value.id).subscribe(data => console.log('Delete:', data));
    }
    this.categories.removeAt(index);
  }

   /** Save the budget items in the edit form */
   save() {
    const itemsToSave: Transaction[] = [];
    this.categories.controls.forEach(formControl => {
      const item: Transaction = {
        id: formControl.value.id,
        category: formControl.value.name,
        amount: formControl.value.amount,
        type: this.type,
        date: this.date,
      }
      itemsToSave.push(item);
    });
    this.transactionService.create(itemsToSave).subscribe(data => {
      console.log('Saved transactions: ', data)
      this.loadTransactions();
    });
  }

}