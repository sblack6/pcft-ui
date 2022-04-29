import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction/transaction.service';
import { getMonth, getMonthRange, getMonthYear, getYear } from 'src/app/shared/date-utility-functions';
import { monthNameMap, TYPE_BUDGET, TYPE_TRANSACTION } from 'src/app/shared/transaction-constants';
import { findAllCategories, findAllTags, includesTag } from 'src/app/shared/transaction-utility-functions';
import { DateRange } from '../../date-picker/range/date-range-picker.component';

@Component({
  selector: 'app-category-tag-detail',
  templateUrl: './category-tag-detail.component.html',
  styleUrls: ['./category-tag-detail.component.css']
})
export class CategoryTagDetailComponent {

  highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  series;
  
  updateFlag = false;

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

  allTransactions: Transaction[];

  monthRange: string[];

  isLoading = true;

  _dateRange: DateRange;
  @Input() set dateRange(value: DateRange) {
    if (value) {
      this._dateRange = value;
      this.setDateRange();
      this.loadTransactions();
    }
  }

  get dateRange(): DateRange {
    return this._dateRange;
  }

  categoryOptions: {label: string, value: string}[];

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

  constructor(private transactionService: TransactionService) {}

  setDateRange() {
    this.monthRange = getMonthRange(this._dateRange);
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

  loadTransactions() {
    this.transactionService.search(this.dateRange.start, this.dateRange.end).subscribe((data: Transaction[]) => {
      this.allTransactions = data;
      this.populateCategoryOptions();
      this.populateChartData();
      this.isLoading = false;
    });
  }

  populateCategoryOptions() {
    const categories = findAllCategories(this.allTransactions);
    this.categoryOptions = Array.from(categories).map(category => {
      return {
        label: category.substring(0,1).toUpperCase() + category.substring(1),
        value: category
      }
    });
    this.categorySelected = this.categoryOptions ? this.categoryOptions[0].value : '';
  }

  populateChartData() {
    const transactionsForCategory = this.allTransactions.filter(transaction => transaction.category === this.categorySelected);
    const series: any[] = [];
    this.populateTagTimeSeriesData(transactionsForCategory, series);
    this.populateBudgetTimeSeriesData(transactionsForCategory, series);
    this.series = series;
    this.updateChartData();
  }

  populateTagTimeSeriesData(transactionsForCategory: Transaction[], series: any[]) {
    const tags = findAllTags(transactionsForCategory);
    tags.add('');
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
    console.log('Chart options: ', this.chartOptions)
  }
}
