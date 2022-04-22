import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { DateRangePickerComponent } from './date-picker/range/date-range-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionService } from './service/transaction/transaction.service';
import { HttpClientModule } from '@angular/common/http';
import { BudgetEditorComponent } from './budget/budget-editor/budget-editor.component';
import { BudgetEditTableComponent } from './budget/budget-edit-table/budget-edit-table.component';
import { DateMonthPickerComponent } from './date-picker/month/date-month-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    DateRangePickerComponent,
    HeaderComponent,
    HomeComponent,
    BudgetEditorComponent,
    BudgetEditTableComponent,
    DateMonthPickerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    TransactionService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
