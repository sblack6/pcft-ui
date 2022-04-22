import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-date-month-picker',
  templateUrl: './date-month-picker.component.html',
  styleUrls: ['./date-month-picker.component.css']
})
export class DateMonthPickerComponent {

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  date = new FormControl();

  onDateChange(monthAndYear, datePicker) {
    console.log('Month & year selected: ', JSON.stringify(monthAndYear)) //2025-02-01
    console.log('Month and year type: ', typeof(monthAndYear))
    
    this.date.setValue(monthAndYear);
    datePicker.close();
    this.dateChanged.emit(this.date.value);
  }

}
