import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onDateChange() {
    console.log('Range: ', this.range);
    console.log('Start date: ', this.range.value.start)
    console.log('End date: ', this.range.value.end)
  }

}
