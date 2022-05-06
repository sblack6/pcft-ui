import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-tag-detail-table',
  templateUrl: './tag-detail-table.component.html',
  styleUrls: ['./tag-detail-table.component.css']
})
export class TagDetailTableComponent {

  _transactions: Transaction[]; 

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.populateTableData();
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  _tagSelected: string;

  @Input() set tagSelected(value: string) {
    if (value) {
      this._tagSelected = value;
      this.populateTableData();
    }
  }

  get tagSelected(): string {
    return this._tagSelected;
  }

  populateTableData() {
    if (!this.tagSelected || !this.transactions) {
      return;
    }

    
  }

}
