import { Component, Input } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { findAllCategories, findAllTags } from 'src/app/shared/transaction-utility-functions';

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

  total: number;

  categoryTotals: {category: string, total: number}[];

  tagTotals: {tag: string, total: number}[];

  populateTableData() {
    if (!this.tagSelected || !this.transactions) {
      return;
    }
    const transactionsForTag = this.transactions.filter(transaction => transaction.tags && transaction.tags.includes(this.tagSelected));
    console.log('Transactions for tag: ', transactionsForTag)
    this.total = Math.abs(transactionsForTag.map(transaction => transaction.amount).reduce((partialSum, a) => partialSum + a, 0));
    this.findCategoryTotals(transactionsForTag);
    this.findTagTotals(transactionsForTag);
  }

  findCategoryTotals(transactions: Transaction[]) {
    const categories = findAllCategories(transactions);
    const categoryTotals = [];
    categories.forEach(category => {
      const amount = transactions.filter(transaction => transaction.category === category)
        .map(transcation => transcation.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
      categoryTotals.push({
        category: category,
        total: Math.abs(amount),
      });
    });
    this.categoryTotals = categoryTotals;
  }

  findTagTotals(transactions: Transaction[]) {
    const tags = findAllTags(transactions);
    tags.delete(this.tagSelected);
    const tagTotals = [];
    // Find the total of transactions containing ONLY the selected tag.
    const amount = transactions.filter(transaction => transaction.tags === this.tagSelected)
        .map(transcation => transcation.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
    tagTotals.push({
      tag: this.tagSelected,
      total: Math.abs(amount),
    });
    // Find the total of transactions for all other tags.
    tags.forEach(tag => {
      const amount = transactions.filter(transaction => transaction.tags.includes(tag))
        .map(transcation => transcation.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
      tagTotals.push({
        tag: tag,
        total: Math.abs(amount),
      });
    });

    this.tagTotals = tagTotals;
  }

}
