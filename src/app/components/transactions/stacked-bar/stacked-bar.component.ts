import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Transaction } from 'src/app/model/transaction';
import { getMonthYear } from 'src/app/shared/date-utility-functions';
import { findAllCategories } from 'src/app/shared/transaction-utility-functions';

@Component({
  selector: 'app-stacked-bar',
  templateUrl: './stacked-bar.component.html',
  styleUrls: ['./stacked-bar.component.css']
})
export class StackedBarComponent {

  @Input() title: string;

  @Input() monthRange: string[];

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.populateChartData();
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  isLoading = true;

  highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  series;

  defaultOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    yAxis: {
      title: {
        text: 'Dollars ($)'
      }
    },
    plotOptions: {
      column: {
          stacking: 'normal',
      },
    },
    series: [],
  };

  populateChartData() {
    const categories = findAllCategories(this.transactions);
    const lines = [];
    categories.forEach(category => {
      const line = [];
      this.monthRange.forEach(monthYear => {
        const amount = this.transactions
          .filter(transaction => transaction.category === category && getMonthYear(transaction.date) === monthYear)
          .map(transaction => transaction.amount)
          .reduce((partialSum, a) => partialSum + a , 0);
        line.push([monthYear, amount]);
      });
      lines.push({
        name: category,
        data: line,
      });
    });
    this.series = lines;
    this.setChartOptions();
    this.isLoading = false;
  }

  setChartOptions() {
    this.chartOptions = {
      ...this.defaultOptions,
      title: {
        text: this.title,
      },
      xAxis: {
        categories: this.monthRange,
      },
      series: this.series,
    };
  }

}
