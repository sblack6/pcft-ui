import { Component } from '@angular/core';
import { DateRange } from '../date-picker/range/date-range-picker.component';
import { TransactionService } from '../service/transaction/transaction.service';
import { DEFAULT_DATE_RANGE } from '../shared/transaction-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  dateRange: DateRange = DEFAULT_DATE_RANGE;

  constructor(private transactionService: TransactionService) { }

  onDateChanged($event) {
    this.dateRange = $event;
  }

  uploadFile() {

  }
}
