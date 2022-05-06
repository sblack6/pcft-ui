import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { DateRangePickerComponent } from './components/date-picker/range/date-range-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionService } from './service/transaction/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { BudgetEditorComponent } from './components/budget/budget-editor/budget-editor.component';
import { BudgetEditTableComponent } from './components/budget/budget-edit-table/budget-edit-table.component';
import { DateMonthPickerComponent } from './components/date-picker/month/date-month-picker.component';
import { BudgetHomeComponent } from './components/budget/budget-home/budget-home.component';
import { TransactionDetailTableComponent } from './components/budget/transaction-detail-table/transaction-detail-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TransactionsTimeSeriesChartComponent } from './components/budget/transactions-time-series-chart/transactions-time-series-chart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TagOverviewComponent } from './components/tags/tag-overview/tag-overview.component';
import { TagHomeComponent } from './components/tags/tag-home/tag-home.component';
import { CategoryTagDetailComponent } from './components/tags/category-tag-detail/category-tag-detail.component';
import { TagDetailTableComponent } from './components/tags/tag-detail-table/tag-detail-table.component';
import { TagDetailChartComponent } from './components/tags/tag-detail-chart/tag-detail-chart.component';
import { TransactionSelectorComponent } from './components/selector/transaction-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    DateRangePickerComponent,
    HeaderComponent,
    HomeComponent,
    BudgetEditorComponent,
    BudgetEditTableComponent,
    DateMonthPickerComponent,
    BudgetHomeComponent,
    TransactionDetailTableComponent,
    FileUploadComponent,
    TransactionsTimeSeriesChartComponent,
    TagOverviewComponent,
    TagHomeComponent,
    CategoryTagDetailComponent,
    TagDetailTableComponent,
    TagDetailChartComponent,
    TransactionSelectorComponent,
  ],
  imports: [
    AgGridModule.withComponents([]),
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HighchartsChartModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    TransactionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
