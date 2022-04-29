import { Component } from '@angular/core';
import { DEFAULT_DATE_RANGE } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-tag-home',
  templateUrl: './tag-home.component.html',
  styleUrls: ['./tag-home.component.css']
})
export class TagHomeComponent {

  dateRange = DEFAULT_DATE_RANGE;

  onDateChanged($event) {
    this.dateRange = $event;
  }

}
