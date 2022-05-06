import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { FIELD_CATEGORY, FIELD_TAGS } from 'src/app/shared/transaction-constants';
import { findAllCategories, findAllTags } from 'src/app/shared/transaction-utility-functions';

@Component({
  selector: 'app-transaction-selector',
  templateUrl: './transaction-selector.component.html',
  styleUrls: ['./transaction-selector.component.css']
})
export class TransactionSelectorComponent {

  @Output() optionSelected: EventEmitter<string> = new EventEmitter();

  @Input() type: string;

  _transactions: Transaction[];
  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.setSelectOptions();
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  selectOptions: {label: string, value: string}[];

  _selected: string;
  set selected(value: string) {
    if (value) {
      this._selected = value;
      this.optionSelected.emit(this.selected);
    }
  }

  get selected(): string {
    return this._selected;
  }

  setSelectOptions() {
    if (this.type === FIELD_CATEGORY) {
      this.findCategorySelectOptions();
    } else if (this.type === FIELD_TAGS) {
      this.findTagSelectOptions();
    }
    this.selected = this.selectOptions ? this.selectOptions[0].value : null;
  }

  findCategorySelectOptions() {
    const categories = findAllCategories(this.transactions);
    this.selectOptions = Array.from(categories).map(category => {
      return {
        label: category.substring(0,1).toUpperCase() + category.substring(1),
        value: category
      }
    });
  }

  findTagSelectOptions() {
    const tags = findAllTags(this.transactions);
    this.selectOptions = Array.from(tags).map(tag => {
      return {
        label: tag.substring(0,1).toUpperCase() + tag.substring(1),
        value: tag
      };
    });
  }

}
