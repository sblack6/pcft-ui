import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { convertDatePickerOutputToApiDate } from '../date-picker-utility';


@Component({
  selector: 'app-date-month-picker',
  templateUrl: './date-month-picker.component.html',
  styleUrls: ['./date-month-picker.component.css']
})
export class DateMonthPickerComponent {

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  date = new FormControl();

  onDateChange(monthAndYear, datePicker) {
    this.date.setValue(monthAndYear);
    datePicker.close();
    this.dateChanged.emit(convertDatePickerOutputToApiDate(JSON.stringify(this.date.value)));
  }

}
