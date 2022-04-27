import { Component } from '@angular/core';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';
import { DEFAULT_DATE_RANGE } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-budget-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.css']
})
export class BudgetHomeComponent {

  dateRange: DateRange = DEFAULT_DATE_RANGE;

  onDateChanged($event: DateRange) {
    this.dateRange = $event;
  }
}
