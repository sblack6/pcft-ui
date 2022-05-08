import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetEditorComponent } from './components/budget/budget-editor/budget-editor.component';
import { BudgetHomeComponent } from './components/budget/budget-home/budget-home.component';
import { CashFlowHomeComponent } from './components/cash-flow/cash-flow-home/cash-flow-home.component';
import { SavingsHomeComponent } from './components/savings/savings-home/savings-home.component';
import { TagHomeComponent } from './components/tags/tag-home/tag-home.component';
import { TransactionEditPageComponent } from './components/transactions/transaction-edit-page/transaction-edit-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'budget', component: BudgetHomeComponent },
  { path: 'edit-budget', component: BudgetEditorComponent },
  { path: 'tags', component: TagHomeComponent },
  { path: 'savings', component: SavingsHomeComponent },
  { path: 'cash-flow', component: CashFlowHomeComponent },
  { path: 'edit/:type', component: TransactionEditPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
