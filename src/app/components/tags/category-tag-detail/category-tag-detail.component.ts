import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Transaction } from 'src/app/model/transaction';
import { getMonth, getMonthRange, getMonthYear, getYear } from 'src/app/shared/date-utility-functions';
import { monthNameMap, TYPE_BUDGET, TYPE_TRANSACTION } from 'src/app/shared/transaction-constants';
import { findAllTags, includesTag } from 'src/app/shared/transaction-utility-functions';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-category-tag-detail',
  templateUrl: './category-tag-detail.component.html',
  styleUrls: ['./category-tag-detail.component.css']
})
export class CategoryTagDetailComponent {

  @Input() dateRange: DateRange;

  _transactions: Transaction[];

  @Input() set transactions(value: Transaction[]) {
    if (value) {
      this._transactions = value;
      this.setDateRange()
      this.populateChartData();
    }
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  _categorySelected: string;

  @Input() set categorySelected(value: string) {
    if (value) {
      this._categorySelected = value;
      this.populateChartData();
    }
  }

  get categorySelected(): string {
    return this._categorySelected;
  }

  highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  series;

  defaultOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Category Spending Breakdown Over Time',
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

  monthRange: string[];

  isLoading = true;

  setDateRange() {
    this.monthRange = getMonthRange(this.dateRange);
    this.defaultOptions = {
      ...this.defaultOptions,
      xAxis: {
        categories: this.monthRange,
        labels: {
          formatter: function() {
            return monthNameMap.get(getMonth(this.value as string)) + ' ' + getYear(this.value as string);
          }
        }
      },
    }
  }

  populateChartData() {
    if (!this.transactions || !this.categorySelected) {
      return;
    }
    const transactionsForCategory = this.transactions.filter(transaction => transaction.category === this.categorySelected);
    const series: any[] = [];
    this.populateTagTimeSeriesData(transactionsForCategory, series);
    this.populateBudgetTimeSeriesData(transactionsForCategory, series);
    this.series = series;
    this.updateChartData();
    this.isLoading = false;
  }

  populateTagTimeSeriesData(transactionsForCategory: Transaction[], series: any[]) {
    const tags: Set<string> = new Set();
    tags.add('');
    findAllTags(transactionsForCategory).forEach(tag => tags.add(tag));
    tags.forEach(tag => {
      const line: [string, number][] = [];
      this.monthRange.forEach(monthYear => {
        const amount = transactionsForCategory
          .filter(transaction => getMonthYear(transaction.date) === monthYear && transaction.type === TYPE_TRANSACTION && includesTag(transaction, tag))
          .map(transaction => transaction.amount)
          .reduce((partialSum, a) => partialSum + a, 0);
        line.push([monthYear, Math.abs(amount)]);
      });
      series.push({
        name: tag === '' ? 'Untagged' : tag,
        data: line,
        type: 'column',
      });
    });
  }

  populateBudgetTimeSeriesData(transactionsForCategory: Transaction[], series: any[]) {
    const line: [string, number][] = []
    this.monthRange.forEach(monthYear => {
      const amount = transactionsForCategory
        .filter(transaction => getMonthYear(transaction.date) === monthYear && transaction.type === TYPE_BUDGET)
        .map(transaction => transaction.amount)
        .reduce((partialSum, a) => partialSum + a, 0);
      line.push([monthYear, Math.abs(amount)]);
    });
    series.push({
      name: 'Budget',
      data: line,
      type: 'spline',
    });
  }

  updateChartData() {
    this.chartOptions = {
      ...this.defaultOptions,
      series: this.series,
    }
  }
}
