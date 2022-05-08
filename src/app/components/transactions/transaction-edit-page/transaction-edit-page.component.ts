import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_ANNUAL_DATE, TYPE_ANNUAL } from 'src/app/shared/transaction-constants';
import { YEAR } from '../../date-picker/single/date-picker.component';

@Component({
  selector: 'app-transaction-edit-page',
  templateUrl: './transaction-edit-page.component.html',
  styleUrls: ['./transaction-edit-page.component.css']
})
export class TransactionEditPageComponent implements OnInit {

  type: string;

  dateType: string;

  date = DEFAULT_ANNUAL_DATE;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type').toUpperCase();
    if (this.type === TYPE_ANNUAL) {
      this.dateType = YEAR;
    }
  }

  onDateChange($event) {
    this.date = $event;
  }

}
