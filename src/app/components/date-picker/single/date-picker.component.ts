import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { convertDatePickerOutputToApiDate } from '../date-picker-utility';

export const YEAR = 'year';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {

  @Input() type = 'month';

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  date = new FormControl();

  onYearChange(year, datePicker) {
    if (this.type === 'year') {
      this.date.setValue(year);
      datePicker.close();
      this.outputDate();
    }
  }

  onMonthChange(monthAndYear, datePicker) {
    this.date.setValue(monthAndYear);
    datePicker.close();
    this.outputDate();
  }

  outputDate() {
    this.dateChanged.emit(convertDatePickerOutputToApiDate(JSON.stringify(this.date.value)));
  }

}
