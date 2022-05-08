import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent implements OnInit {

  isLoading = true;

  constructor() { }

  ngOnInit(): void {
  }

}
