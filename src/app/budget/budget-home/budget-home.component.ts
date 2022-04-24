import { Component } from '@angular/core';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-budget-home',
  templateUrl: './budget-home.component.html',
  styleUrls: ['./budget-home.component.css']
})
export class BudgetHomeComponent {

  dateRange: DateRange;

  onDateChanged($event: DateRange) {
    this.dateRange = $event;
  }
}
