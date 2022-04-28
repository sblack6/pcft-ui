import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DateRange } from 'src/app/date-picker/range/date-range-picker.component';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { Transaction } from 'src/app/model/transaction';
import { findAllCategories } from 'src/app/shared/transaction-utility-functions';
import { getMonth, getMonthRange, getMonthYear, getYear } from 'src/app/shared/date-utility-functions';
import { monthNameMap, SPEND_TRANSACTION_TYPES } from 'src/app/shared/transaction-constants';

@Component({
  selector: 'app-transactions-time-series-chart',
  templateUrl: './transactions-time-series-chart.component.html',
  styleUrls: ['./transactions-time-series-chart.component.css']
})
export class TransactionsTimeSeriesChartComponent {

  highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  series;
  
  defaultOptions: Highcharts.Options = {
    chart: {
      type: "spline"
    },
    title: {
      text: 'Transactions Over Time',
    },
    yAxis: {
      title: {
        text: 'Dollars ($)'
      }
    },
    colors: ['#19cf25', '#cf1919', '#000000'],
  };

  categoryOptions: {label: string, value: string}[];

  transactionsData: Transaction[];

  monthRange: string[];

  _dateRange: DateRange;

  @Input() set dateRange(value: DateRange) {
    if (value) {
      this._dateRange = value;
      this.monthRange = getMonthRange(this._dateRange);
      // this.chartOptions.xAxis[0].categories = this.monthRange;
      this.loadTransactions();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  _categorySelected: string;

  set categorySelected(value: string) {
    if (value) {
      this._categorySelected = value;
      this.populateChartData();
    }
  }

  get categorySelected(): string {
    return this._categorySelected;
  }

  constructor(private transactionService: TransactionService) { }

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.transactionsData = data;
      this.populateCategoryOptions();
      this.populateChartData();
    });
  }

  populateCategoryOptions() {
    const categories = findAllCategories(this.transactionsData);
    this.categoryOptions = Array.from(categories).map(category => {
      return {
        label: category.substring(0,1).toUpperCase() + category.substring(1),
        value: category
      }
    });
    this.categorySelected = this.categoryOptions ? this.categoryOptions[0].value : '';
  }

  populateChartData() {
    // TODO: format transactions data for the category chart.
    const transactionsForCategory = this.transactionsData.filter(transaction => transaction.category === this.categorySelected);
    const series = [];
    SPEND_TRANSACTION_TYPES.forEach(type => {
      const line: any[] = []; 
      this.monthRange.forEach(monthYear => {
        const amount = transactionsForCategory.filter(transaction => transaction.type === type && getMonthYear(transaction.date) === monthYear)
          .map(transaction => transaction.amount)
          .reduce((partialSum, a) => partialSum + Math.abs(a), 0);
        line.push([monthYear, amount]);
      });
      series.push({
        name: type,
        data: line
      });
    });
    const line: any = [];
    series[0].data.forEach(([date, amount], index) => {
      const balanceAmt = amount - series[1].data[index][1] + (line[index-1] ? line[index-1][1] : 0);
      line.push([date, balanceAmt]);
    });
    series.push({
      name: 'BALANCE',
      data: line,
    });
    this.series = series;
    this.setChartOptions();
  }

  setChartOptions() {
    this.chartOptions = {
      ...this.defaultOptions,
      xAxis: {
        categories: this.monthRange,
        labels: {
          formatter: function() {
            return monthNameMap.get(getMonth(this.value as string)) + ' ' + getYear(this.value as string);
          }
        }
      },
      series: this.series,
    }
  }
}
