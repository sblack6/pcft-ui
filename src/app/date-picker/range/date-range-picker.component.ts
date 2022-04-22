import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { convertDatePickerOutputToApiDate } from '../date-picker-utility';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.css']
})
export class DateRangePickerComponent {

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  onDateChange() {
    this.range.setValue({
      start: convertDatePickerOutputToApiDate(JSON.stringify(this.range.value.start)),
      end: convertDatePickerOutputToApiDate(JSON.stringify(this.range.value.end))
    });
    this.dateChanged.emit(this.range.value);
  }

}
