import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';

@Component({
  selector: 'app-tag-bar-chart',
  templateUrl: './tag-bar-chart.component.html',
  styleUrls: ['./tag-bar-chart.component.css']
})
export class TagBarChartComponent {

  _tags: string;

  @Input() set tags(value: string) {
    if (value) { 
      this._tags = value;
      this.populateChartData();
    }
  }

  get tags(): string {
    return this._tags;
  }

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.populateChartData()
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  populateChartData() {
    if (!this.tags || !this.transactions) {
      return;
    }

  }

}
