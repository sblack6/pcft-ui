import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_ANNUAL_DATE } from 'src/app/shared/transaction-constants';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-transaction-edit-page',
  templateUrl: './transaction-edit-page.component.html',
  styleUrls: ['./transaction-edit-page.component.css']
})
export class TransactionEditPageComponent implements OnInit {

  type: string;

  date = DEFAULT_ANNUAL_DATE;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type').toUpperCase();
  }

}
