import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { DEFAULT_DATE_RANGE, FIELD_CATEGORY, FIELD_TAGS, TAG_DATE_RANGE } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-tag-home',
  templateUrl: './tag-home.component.html',
  styleUrls: ['./tag-home.component.css']
})
export class TagHomeComponent implements OnInit {

  categoryType = FIELD_CATEGORY;
  tagType = FIELD_TAGS;

  transactions: Transaction[];

  dateRange = TAG_DATE_RANGE;

  categorySelected: string;
  tagSelected: string;
  multiTagSelected: string;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactions = data;
    });
  }

  onDateChanged($event) {
    this.dateRange = $event;
    this.loadTransactions();
  }

  onCategoryChanged($event) {
    this.categorySelected = $event;
  }

  onTagChanged($event) {
    this.tagSelected = $event;
  }

  onTagMultipleSelectChanged($event) {
    this.multiTagSelected = $event;
  }

}
