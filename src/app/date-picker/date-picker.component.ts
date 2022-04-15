import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {

  @Output() dateChanged: EventEmitter<any> = new EventEmitter();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  onDateChange() {
    this.dateChanged.emit(this.range.value);
  }

}
